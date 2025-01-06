export function FileToBase64(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function base64ToFile(filename: string, base64: string): File {
  const [_, mimeType, string] = base64.match(/^data:([^;]+);base64,(.+)$/) as string[];
  const value = atob(string);
  const buffer = new Uint8Array(value.length);
  for (let i = 0, len = value.length; i < len; i++) {
    buffer[i] = value.charCodeAt(i);
  }
  return new File([buffer], filename, {type: mimeType});
}

export function toImage(value: File | string): Promise<HTMLImageElement> {
  const image = new Image();
  return new Promise(async (resolve, reject) => {
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      reject(new Error('Failed to load image'));
    };
    image.src = typeof value === 'string' ? value : await FileToBase64(value);
  });
}

export function getFile(): Promise<File> {
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

export function getDragFile({dataTransfer}: { dataTransfer: DataTransfer }): Array<File> {
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
