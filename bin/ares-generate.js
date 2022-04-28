#!/usr/bin/env node

const path = require('path'),
    nopt = require('nopt'),
    async = require('async'),
    inquirer = require('inquirer'),
    log = require('npmlog');

const readJsonSync = require('./../lib/util/json').readJsonSync,
    hasProperty = require('./../lib/util/property'),
    Generator = require('./../lib/generator'),
    commonTools = require('./../lib/base/common-tools');

const cliControl = commonTools.cliControl,
    version = commonTools.version,
    help = commonTools.help,
    appdata = commonTools.appdata,
    errHndl = commonTools.errMsg;

const processName = path.basename(process.argv[1], '.js');

process.on('uncaughtException', function (err) {
    log.error('uncaughtException', err.toString());
    log.info('uncaughtException', err.stack);
    cliControl.end(-1);
});

if (process.argv.length === 2) {
    process.argv.splice(2, 0, '--help');
}

let idx;
if ((idx = process.argv.indexOf('--list')) !== -1 || (idx = process.argv.indexOf('-l')) !== -1) {
    if (process.argv[idx+1] && process.argv[idx+1].toString().match(/^-/)) {
        process.argv.splice(idx+1, 0, 'true');
    }
}

const knownOpts = {
    "help": Boolean,
    "version": Boolean,
    "list": String,
    "overwrite": Boolean,
    "servicename": String,
    "template": String,
    "property": [String, Array],
    "no-query": Boolean,
    "level": ['silly', 'verbose', 'info', 'http', 'warn', 'error']
};

const shortHands = {
    "h":        "--help",
    "V":        "--version",
    "l":        "--list",
    "f":        "--overwrite",
    "t":        "--template",
    "p":        "--property",
    "s":        "--servicename",
    "nq":       "--no-query",
    "v":        ["--level", "verbose"]
};

const argv = nopt(knownOpts, shortHands, process.argv, 2 /* drop 'node' & 'ares-generate.js' */);

log.heading = processName;
log.level = argv.level || 'warn';
log.verbose('argv', argv);

if (argv.level) {
    delete argv.level;
    if (argv.argv.remain.length === 0 && (Object.keys(argv)).length === 1) {
        argv.help = true;
    }
}

const config = appdata.getConfig(true),
    options = {
        tmplFile: path.join(__dirname, '/../files/conf/', 'template.json'),
        overwrite: argv.overwrite,
        tmplName: argv.template,
        listType: argv.list,
        props: argv.property || [],
        appinfo: {},
        pkginfo: {},
        svcinfo: {},
        svcName: argv.servicename,
        query: ((hasProperty(argv, 'query')) ? argv.query : true),
        out: argv.argv.remain[0]
    };

let op,
    generator;

if (argv.help) {
    showUsage();
    cliControl.end();
} else if (argv.version) {
    version.showVersionAndExit();
} else if (argv.list) {
    op = list;
} else {
    op = generate;
}

if (op) {
    version.checkNodeVersion(function() {
        async.series([
            op.bind(this)
        ],finish);
    });
}

function showUsage(hiddenFlag) {
    if (hiddenFlag) {
        help.display(processName, appdata.getConfig(true).profile, hiddenFlag);
    } else {
        help.display(processName, appdata.getConfig(true).profile);
    }
}

function getGenerator() {
    if (!generator) {
        generator = new Generator(options.tmplFile);
    }
    return generator;
}

function list(next) {
    const gen = getGenerator();
    gen.showTemplates(options.listType);
    next();
}

function parsePropArgs(targetInfo) {
    const props = options.props;
    const info = targetInfo;
    if (props.length === 1 && props[0].indexOf('{') !== -1 && props[0].indexOf('}') !== -1 &&
        ( (props[0].split("'").length - 1) % 2) === 0)
    {
        props[0] = props[0].replace(/'/g,'"');
    }
    props.forEach(function(prop) {
        try {
            const data = JSON.parse(prop);
            for (const k in data) {
                info[k] = data[k];
            }
        } catch (err) {
            const tokens = prop.split('=');
            if (tokens.length === 2) {
                info[tokens[0]] = tokens[1];
            } else {
                log.warn('Ignoring invalid arguments:', prop);
            }
        }
    });
}

function getQueryFile(profile, type) {
    const fileName = "query-"+ type + ".json";
    const queryFile = path.join(__dirname, "../files/conf/query", fileName);
    return queryFile;
}

function queryInfo(queryFile) {
    const queries = readJsonSync(queryFile);
    const questions = [];
    for (const q in queries) {
        const question = {};
        question.type = "input";
        question.name = q;
        question.message = queries[q].query;
        question.default = queries[q].default;
        questions.push(question);
    }
    return inquirer.prompt(questions, function(answers) {
        return answers;
    });
}

function generate(next) {
    const gen = getGenerator();
    const templates = gen.getTemplates();
    if (!options.tmplName) {
        for (const name in templates) {
            if (templates[name].default) {
                options.tmplName = name;
                break;
            }
        }
    }
    if (!options.tmplName) {
        return next(errHndl.changeErrMsg("EMPTY_VALUE", "TEMPLATE"));
    }
    if (!options.out) {
        return next(errHndl.changeErrMsg("EMPTY_VALUE", "APP_DIR"));
    }
    Promise.resolve()
        .then(function() {
            const overwrite = !!options.overwrite,
                useInquirer = !!options.query,
                dest = path.resolve(options.out),
                existDir = gen.existOutDir(dest);

            const questions = [{
                type: "confirm",
                name: "overwrite",
                message: "The directory already exists. The template files in the directory will be replaced. Continue?",
                default: false,
                when: function() {
                    return !overwrite && useInquirer && existDir;
                }
            }];
            return inquirer.prompt(questions).then(function(answers) {
                options.overwrite = answers.overwrite || options.overwrite;
                if (existDir && !options.overwrite) {
                    throw errHndl.changeErrMsg("NOT_OVERWRITE_DIR", dest);
                }
            });
        })
        .then(function() {
            const template = templates[options.tmplName];
            if (!template) throw errHndl.changeErrMsg("INVALID_VALUE", "TEMPLATE", options.tmplName);
            if (!template.type) {
                return;
            }
            if(!options.props.length) { // query mode
                if (options.query && options.tmplName.match(/(^hosted)/)) {
                    const queryConfigFile = getQueryFile(config.profile, 'hosted');
                    return queryInfo(queryConfigFile).then(function(info) {
                        for (const i in info) {
                            options.appinfo[i] = info[i];
                        }
                    });
                } else if (options.query && template.type.match(/(app$|appinfo$)/)) {
                    const queryConfigFile = getQueryFile(config.profile, 'app');
                    return queryInfo(queryConfigFile).then(function(info) {
                        for (const i in info) {
                            options.appinfo[i] = info[i];
                        }
                    });
                } else if (options.query && !options.svcName &&
                    template.type.match(/(service$|serviceinfo$)/)) {
                    const queryConfigFile = getQueryFile(config.profile, 'service');
                    return queryInfo(queryConfigFile).then(function(info) {
                        // FIXME: hard-coded considering info.id is servicename
                        if (info.id) options.svcName = info.id;
                    });
                } else if (options.query && template.type.match(/(package$|packageinfo$)/)) {
                    const queryConfigFile = getQueryFile(config.profile, 'package');
                    return queryInfo(queryConfigFile).then(function(info) {
                        for (const i in info) {
                            options.pkginfo[i] = info[i];
                        }
                    });
                }
            } else if (template.type.match(/(app$|appinfo$)/)) {
                parsePropArgs(options.appinfo);
            } else if (template.type.match(/(service$|serviceinfo$)/)) {
                parsePropArgs(options.svcinfo);
            } else if (template.type.match(/(package$|packageinfo$)/)) {
                parsePropArgs(options.pkginfo);
            }
        })
        .then(function() {
            return gen.generate(options)
                .then(function() {
                    finish(null, {
                        "msg": "Success"
                    });
                });
        })
        .catch(function(err) {
            finish(err);
        });
}

function finish(err, value) {
    if (err) {
        log.error(err.toString());
        log.verbose(err.stack);
        cliControl.end(-1);
    } else {
        if (value && value.msg) {
            console.log(value.msg);
        }
        cliControl.end();
    }
}
