# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.12.0] - 2022-02
### Added
- Added --default option in ares-setup-device command
- Added file watcher and auto reload function in ares-launch --hosted command
- Added --info and --info-detail option in ares-package command
- Added --resource-monitor option in ares-device-info command
- Added --simulator option in ares-launch command

### Changed
- Enhanced readability of --listfull option in ares-install command

### Fixed
- Fixed js_service template not to use ES6 syntax for webOS4.5 or lower

### Removed
- Removed --storage and --storage-list options in ares-install command

## [1.11.2] - 2021-08
### Changed
- Updated the source code through static analysis (ESLint)
- Updated webOSTVjs-1.2.3 to webOSTVjs-1.2.4

### Fixed
- Fixed ares-gdbserver command for webOS22 or higher
- Fixed the build script to resolve IDE issue on templates

### Removed
- Removed enyo building & deploy logic in ares-package

## [1.11.0] - 2021-03-03
### Added
- Added unit test scripts for developers
- Added ares-extend-dev command
- Added --host-ip option in ares-launch

### Changed
- Updated appinfo schema based on SAM
- Updated the app templates
- Updated node version to v8.12.0
- Updated webOSTVjs-1.2.0 to webOSTVjs-1.2.3
- Refactored error messages
- Updated dependency npm version in package.json not to use caret ranges
- Updated node.exe for windows 64bit
- Updated location of node file to bin

### Fixed
- Fixed ares-package --no-minify error with regular expressions
- Fixed an error from since option of ares-log
- Fixed an error from port option of ares-gdbserver
- Fixed an error from ares-device-info on webOS2.0 or lower
- Fixed ares-gdbserver command to check webOS version
- Fixed openBrowser bug and removed invalid option
- Fixed $command -v bug

### Removed
- Remove native-service, nativeserviceinfo and webicon templates
- Remove ose, signage, commercial_tv dependencies

## [1.10.4] - 2019-12-20
### Changed
- Updated webOSTVjs-1.1.0 to webOSTVjs-1.2.0
- Updated tv service API for ares-device-info
- Excluded app signing for TV 5.0 CLI

### Fixed
- Fixed to pass json launch params as user specified types when launching an app
- Fixed parse error on CLI minification

## [1.10.3] - 2019-11-20
### Added
- Added ares-package --sign, --certificate to help for signage_ndk

### Changed
- Create signage_ndk release package by cli-pack

### Removed
- Removed ares-package --encrypt from help for signage_ndk

## [1.10.2] - 2019-11-14
### Added
- Added a QML app template

### Changed
- Changed template names, basic and webappicon to webapp and icon

## [1.10.1] - 2019-10-21
### Added
- Added the WebOSSerivceBridge web app template
- Added checking each version number is 9 digits or less when packaging an app
- Added the guide on default target device in the CLI help

### Changed
- Changed to show appInstallService's error text when installing an app failed
- Changed the icon images provided by ares-generate --template to new images

### Removed
- Removed the webOS.js library
- ares-inspect --service option cannot be used with --open option
- Changed to provide EULA on the developer site when downloading the CLI package

### Fixed
- Enable ares-inspect --service option
- Fixed an issue where ares-inspect cannot open a browser on Windows
- Fix to create .ssh directory after executing ares-setup-device

## [1.9.5/1.10.0] - 2019-08-14
### Added
- Service only packaging with existing packageinfo.json for TV
- Add packageinfo.json template for TV

### Fixed
- ares-setup-device about .ssh directory error
- ares-inspect -o on Windows error

## [1.9.4] - 2019-06-10
### Changed
- Add ACG permission for OSE templeate
- Disable ares-inspect -s for OSE

## [1.9.3] - 2019-05-24
### Added
- Service only packaging feature for TV
- Add readable permission to packaging source file
- Create Unit test report

### Fixed
- ares-setup-device -R permission error

## [1.9.2] - 2019-04-11
### Added
- Check packaging required field
- Encrypt ipk for signage

### Changed
- Change hosted_webapp type to webapp

### Fixed
- signage target TC failure
- ares-setup-device --reset option bug

## [1.9.1] - 2019-01-08
### Added
- Implement CLI Unit test basic
- Write CHANGELOG.md

### Changed
- Change directory and file structure
- Restruct CLI-PACK
- Update CLI build script
- Change default version 0.0.1 on OSE template

### Removed
- Remove enyo template generation
- Remove unused templates
- Remove watch profile
- Remove "changes" directory

### Fixed
- Print ares-novacom --forward running status

## [1.9.0] - 2018-09-13
### Changed
- Change minify library to support ES6+
- Change UX of overwrite on ares-generate

## [1.8.1] - 2018-07-25
### Added
- Support new product OSE
- Add EULA

### Changed
- Update webOSTVjs-1.0.0 to webOSTVjs-1.1.0

## [1.7.2] - 2018-08-13
### Added
- Support signage_ndk profile

### Changed
- Restruct release package directory structure

## [1.7.1] - 2018-08-02
### Added
- Add ares-device-info command
- Support hosted web app template
- Support new product Commercial TV

### Changed
- Change basic template files about change from webOS.js to webOSTV.js

### Removed
- Remove enyo related files and configs

## [1.6.3] - 2017-08-30
### Changed
- Do not check icon file for ares-package with 'rom'

## [1.6.2] - 2017-07-20
### Added
- Set port to use for ares-server
- Support SCAP Library 1.4.1
- Support SCAP API 1.5.0

## [1.5.2] - 2016-08-18
### Added
- Set port to use for ares-server
- Support SCAP API v1.3

## [1.5.1] - 2016-03-29
### Added
- Set port to use for ares-server

### Fixed
- Fix a bug for minifying enyo 2.6 app

## [1.5.0] - 2016-01-25
### Added
- Templates are updated for Enyo 2.6 app

## [1.1.0] - 2015-01-26
### Added
- webOS.js file into bootplate-web template (non-enyo app template). webOS.js is a library to call Luna Service API from a web app
- CLI command returns a proper exit code
- Support packaging app with symbolic link files

### Changed
- Update bootplate-moonstone template to Enyo 2.5 version
- Reduce app generation time of ares-generate

### Fixed
- Fix app packaging problem in Mac OS, that was occurred by UID
- Exclude .DS_Store file from app directory when packaging in Mac OS
- Clear connection with the target when the execution of CLI command completes

## [1.0.0] - 2014-06-18
### Added
- Support project creation
- Support web app packaging/installing/launching/closing
- Support target device managing
- Support debugging web apps
