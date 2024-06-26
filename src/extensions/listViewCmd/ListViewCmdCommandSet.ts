import { BaseListViewCommandSet, Command, IListViewCommandSetExecuteEventParameters, ListViewStateChangedEventArgs } from '@microsoft/sp-listview-extensibility';
import * as JSZip from 'jszip';
import { sp } from '@pnp/sp/presets/all';

export interface IListViewCmdCommandSetProperties {
  sampleTextOne: string;
}

export default class ListViewCmdCommandSet extends BaseListViewCommandSet<IListViewCmdCommandSetProperties> {
  public onInit(): Promise<void> {
    const downloadZipCommand: Command = this.tryGetCommand('Download_Zip');
    downloadZipCommand.visible = false;
    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);
    return Promise.resolve();
  }

  public async onExecute(event: IListViewCommandSetExecuteEventParameters): Promise<void> {
    switch (event.itemId) {
      case 'Download_Zip':
        try {
          await this.downloadSelectedFiles();
        } catch (error) {
          console.error('Error during file download:', error);
        }
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    const downloadZipCommand: Command = this.tryGetCommand('Download_Zip');
    const selectedRows = this.context.listView.selectedRows || [];
    if (downloadZipCommand) {
      downloadZipCommand.visible = selectedRows.length > 0;
    }
    this.raiseOnChange();
  }

  private async downloadSelectedFiles(): Promise<void> {
    const selectedRows = this.context.listView.selectedRows || [];
    if (selectedRows.length === 0) {
      console.error('No items selected.');
      return;
    }

    try {
      const zip = new JSZip();
      // Fetching files using pnpjs and adding them to JSZip
      for (const row of selectedRows) {
        const fileId = row.getValueByName('UniqueId');
        const fileName = row.getValueByName('FileLeafRef');
        const file = await sp.web.getFileById(fileId).getBlob();
        zip.file(fileName, file);
      }

      // Generate zip file asynchronously
      const content = await zip.generateAsync({ type: 'blob' });

      // Upload the zip file to SharePoint
      const libraryRelativeUrl = '/sites/{sitename}/{documentlibrary}'; // Adjust library relative URL as needed
      const uploadFileName = 'selectedFiles.zip'; // Name for the uploaded zip file
      const folder = sp.web.getFolderByServerRelativeUrl(libraryRelativeUrl);
      const uploadedFile = await folder.files.add(uploadFileName, content, true);

      console.log(`File uploaded successfully: ${uploadedFile.data.ServerRelativeUrl}`);

    } catch (error) {
      console.error('Error downloading and uploading selected files:', error);
    }
  }
}