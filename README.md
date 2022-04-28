# webostv-cli

## Summary
A module that provides:
* command line to generate, package, install, run and debug webOS TV applications.

## Install
* In order to hack on `webostv-cli`:

	$ git clone http://mod.lge.com/hub/tvsdk/webostv-cli.git
	$ cd webostv-cli
	$ npm install

* In order to use a development tree of `webostv-cli` from within your own project, manually add this modules under the source-code using NPM:

	$ cd /path/to/webostv-cli
	$ npm install

## Setup

### Ssh settings
Please refer to [SSH-KEY-SETUP.md](SSH-KEY-SETUP.md) for intructions.

### Path setting (needed only for command line)
The ares commands can be invoked from anywhere in the file system provided the PATH has been set correctly.

On Linux and Mac OS:

	$ export PATH=$PATH:<webos-sdk-commands-full-path>/bin
	For example: export PATH=$PATH:/Users/ares/GIT/ares-webos-sdk/bin

On windows (cmd.exe):

	> SET PATH=%PATH%;<webos-sdk-commands-full-path>/bin
	For example: > SET PATH=%PATH%;C:\Users\ares\GIT\ares-webos-sdk/bin

NOTE: On Windows, you can also use a bash enviromment.
For example: [Git for Windows](http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git) which provides a bash shell as on Linux.

## Command line usage
Warning: http proxy is not yet supported.

### ares-generate (.sh|.bat)

	$ ares-generate -l
	$ ares-generate -t basic -p id=com.myapp -p version=1.2.3 -p title=MyApp MyApp

### ares-package (.sh|.bat)

	$ ares-package MyApp

	Note: ares-package will minify the application if possible.

### ares-install (.sh|.bat)

	$ ares-install --list
	$ ares-install --install com.myapp_1.0.0_all.ipk
	$ ares-install --remove com.myapp

`--install` is the default:

	$ ares-install com.myapp_1.0.0_all.ipk

### ares-launch (.sh|.bat)

	$ ares-launch com.myapp

## Source code organization
The source code of this module is organized as follow:

* `bin`: This directory contains the .sh and .bat wrappers for the ares commands
* `lib`: This directory contains the javascript code used by the server side Ares plugin and the ares commands.
* `files`: This directory contains profile configuration files, help files and project templates.
* `tests`: This directory contains various tests for CLI.

## Test
Install jest npms
* npm install jest -g
* npm install jest-html-reporter

### Unit Test
Use npm test to run every unit test scripts at once
* `npm run unitTest`

Use jest to run specific unit test script
* `jest tests/unitTest/deviceInfo.test.js`

### System Test
Turn on a device :
* Install developer mode app
* login and enable developer mode
* Check ip address
* Enable key server on developer mode app

Must run pretest before the system test
* `npm run pretest -- -i=192.168.0.5 -p=ABC123`

Use npm test to run every system test scripts at once
* `npm run systemTest -- -i=192.168.0.5 -p=ABC123`

Use jest to run specific system test script
* `jest tests/systemTest/withDevice/ares-device-info.test.js -i=192.168.0.5 -p=ABC123`

## Reference
### Emulator

Whether there are one or several Emulator images, TCP Ports Redirections remain the same:

| Name | Host Port | Guest Port |
| ssh | 6622 | 22 |
| web-inspector | 9998 | 9998 |
| remocon | 19001 | 19001 |
