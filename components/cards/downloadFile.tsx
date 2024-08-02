export const downloadFile = (baseURL: string, folderName: string, fileName: string) => {
    const url = `${baseURL}/${folderName}/${fileName}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
