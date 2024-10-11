export function FileToBase64(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function getFile() {
  return new Promise<File>(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = function () {
      resolve((input.files as FileList)[0]);
      input.remove();
    };
    input.click();
  });
}

export function getDragFile({ dataTransfer }: { dataTransfer: DataTransfer }) {
  const items = dataTransfer.items;
  const files: File[] = [];

  function traverseFileTree(item: any, path?: string) {
    path = path || '';
    if (item.isFile) {
      item.file(function (file: File) {
        files.push(file);
      });
    } else if (item.isDirectory) {
      const directoryReader = item.createReader();
      directoryReader.readEntries(function (entries: string | any[]) {
        for (let i = 0; i < entries.length; i++) {
          traverseFileTree(entries[i], path + item.name + '/');
        }
      });
    }
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i].webkitGetAsEntry();
    if (item) traverseFileTree(item);
  }
  return files;
}
