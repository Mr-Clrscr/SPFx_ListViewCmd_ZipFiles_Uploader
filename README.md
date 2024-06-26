# SharePoint List View Command Set

## Overview

This SPFx list view command allows users to zip the selected files from SharePoint document library and upload into the document library.

## Built Using

![spfx](https://img.shields.io/badge/version-1.18.2-green.svg)
![node](https://img.shields.io/badge/node-v18.19.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)

## Solution Details

| Solution    | Author(s) |
| ----------- | --------- |
| listViewCmd | Clrscr    |

## Getting Started

To use this command set, follow these steps:

1. Clone this repository.
2. Navigate to the solution folder.
3. Replace placeholders `{tenant}`, `{sitename}`, `{documentlibrary}` in `serve.json` and `ListViewCmdCommandSet.ts` with your SharePoint Online paths.
4. Open a command-line interface and execute:
   - **npm install**
   - **npm run serve**
5. Navigate to the Document Library using the debug URL provided in the terminal.

## Version History

| Version | Date          | Comments        |
| ------- | ------------- | --------------- |
| 1.0     | June 26, 2024 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## References

- [Building Sample List View Command Set](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api)
- [Deploy List View Command Set](https://www.c-sharpcorner.com/article/sharepoint-framework-spfx-extension-add-list-view-command-set-to-list-docu3/)
