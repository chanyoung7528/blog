---
title: '파일 벨리데이션 함수'
description: '파일 벨리데이션 함수'
image: '/img/posts/tech.png'
draft: false
category: 'snippet'
subImage: '/img/posts/snippet.png'
date: 2024-01-15 22:06:43
tags:
  - validation
---

## getfileSize

```tsx
const getfileSize = () => {
  const sizeInBytes = calculateSize(uploadFiles);

  return (sizeInBytes / (1024 * 1024)).toFixed(2);
};
```

파일의 사이즈를 계산하는 함수입니다.

## validFileSize

```tsx
const fileSize = 524288000;

const calculateSize = (fileList: FileListDataType) => {
  return fileList?.reduce(
    (acc, cur) => (acc += cur?.size || cur?.fileSize || 0),
    0
  );
};
const validFileSize = (currentFiles: File[]) => {
  const files = [...uploadFiles, ...currentFiles].filter(Boolean);

  if (fileSize < +calculateSize(files)) {
    alert('');
    return true;
  }
  return false;
};
```

파일사이즈를 체크해주는 함수입니다.
파일사이즈 누적합산하여 현재 파일의 사이즈랑 비교합니다. 사이즈가 기준사이즈보다 작다면 false, 크다면 true를 반환합니다.

## validFileCount

```tsx
const count = 5;

const validFileCount = (currentFiles: File[], uploadFile: FileListDataType) => {
  const currentFileCount = currentFiles.map(
    (file) => file.name.split('.')[0]
  ).length;
  if (count < uploadFile.length + currentFileCount) {
    alert(`${count}개까지 업로드 가능합니다`);
    return true;
  }
  return false;
};
```

파일의 갯수를 체크해주는 함수입니다.
현재 파일의 카운트와 비교하여 값이 크다면 true, 작다면 false를 반환해줍니다.

## validFileFormat

```tsx
export const fileExtension =
  /^.*.(xls|xlsx|xlsm|xlsb|xltx|doc|docx|docm|dot|pdf)$/;

const validFileFormat = (currentFiles: File[]) => {
  if (
    currentFiles.every((file) => fileValidReg?.test(file.name.toLowerCase()))
  ) {
    return false;
  }

  if (extensionValid !== '') {
    setValidFormat(true);
    return true;
  }

  return true;
};
```

파일 포맷을 체크하는 함수입니다.
파일의 정규식을 기준으로 포맷이 다른경우 true반환합니다.

## validFileDuplication

```tsx
const currentFilenameList = currentFiles.map((file) => file.name.split('.')[0]);

const validFileDuplication = (
  currentFilenameList: string[],
  uploadFile?: FileListDataType
) => {
  if (uploadFile?.some((e) => currentFilenameList.includes(`${e.fileName}`))) {
    alert('');
    return true;
  }
  return false;
};
```

파일의 중복을 체크하는 함수입니다. 이미 업로드된 파일이 있다면 올리지않습니다.

## validDrmFile

```tsx
const readFile = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      // 파일의 내용이 로드되면 resolve 호출

      resolve(e?.target?.result);
    };

    reader.onerror = (error) => {
      // 오류 발생 시 reject 호출
      reject(error);
    };

    // 파일을 읽음 (파일의 인코딩을 명시할 수 있음)
    reader.readAsArrayBuffer(file);
  });
};

const validDrmFile = async (currentFiles: File[]) => {
  const res = await Promise.all(
    currentFiles.map(async (file) => {
      try {
        // 파일을 ArrayBuffer로 읽기
        const arrayBuffer = (await readFile(
          file.slice(0, 8)
        )) as AllowSharedBufferSource;

        if (!arrayBuffer) {
          return true; // If arrayBuffer is falsy, consider it a failure
        }

        // ArrayBuffer를 Uint8Array로 변환
        const uint8Array = new Uint8Array([
          0x9b, 0x20, 0x44, 0x52, 0x4d, 0x4f, 0x4e, 0x45,
        ]);

        // TextDecoder 인스턴스 생성 (인코딩은 파일의 실제 인코딩에 맞게 설정)
        const decoder = new TextDecoder('utf-8');

        // 바이너리 데이터를 텍스트로 디코딩
        const drmDecodedText = decoder.decode(uint8Array).split(' ')[1];
        const fileDecodedText = decoder
          .decode(arrayBuffer)
          .substring(0, 8)
          .split(' ')[1];

        return drmDecodedText === fileDecodedText;
      } catch (error) {
        console.error(error);
        return true;
      }
    })
  );

  const isEveryFileValid = res.some((result) => result);

  return isEveryFileValid;
};
```

Drm 파일을 체크하는 함수입니다. 파일중에 하나라도 DRM파일이 있으면 true를 반환합니다.

## resetFileRef

```tsx
const resetFileRef = useCallback(() => {
  if (fileInputRef.current) {
    const emptyFileList = new DataTransfer().files;
    fileInputRef.current.files = emptyFileList;
  }
}, [uploadFiles, fileInputRef]);
```

인풋으로 파일업로드를 하면 onChange 특성상, 같은 파일업로드를 하면 이벤트가 발생되지않습니다. onChange는 함수그대로 input의 변화를 감지하여 발생되는 함수입니다.그전에 동일한 파일을 선택할 경우 감지되지않기 떄문에 이를 초기화시켜서 다시 벨리데이션 할 수 있도록 도와주는데 목적이 있는 함수입니다.

## 파일벨리데이션 활용해보기

```tsx
const fileValidation = async (
  currentFiles: File[],
  uploadFile: FileListDataType
) => {
  const currentFilenameList = currentFiles.map(
    (file) => file.name.split('.')[0]
  );

  return (
    (isDRMS && (await validDrmFile(currentFiles))) ||
    validFileSize(currentFiles) ||
    validFileCount(currentFilenameList, uploadFile) ||
    validFileFormat(currentFiles) ||
    validFileDuplication(currentFilenameList, uploadFile)
  );
};

if (await fileValidation(fileList, uploadFile)) {
  removeRef();
  return;
}
```

실제 프로젝트에서 fileValidation함수를 통하여 최종적으로 true / false만을 반환하게하여, 업로드 하기전 true가 반환되면 리턴하게 하여 벨리데이션을 구성하였습니다. 각각 함수형 로직으로 작성하여 다른곳에서도 사용할 수 있으며, 함수의 목적에 맞게 활용하기때문에 재사용성과 가독성이 좋고, 외부의 영향을 받지않습니다.

## FIle Data Json형식으로 한번에 보내기

```tsx
const addNoticeData = () => {
  formData.append(
    'RequestDto',
    JSON.stringify({
      version: defalutVersion,
      note: params.note,
      src: btoa(unescape(encodeURIComponent(params.src))),
      releaseDt: params.releaseDt,
    })
  );

  formData.append('file', uploadFiles[0] as Blob);
};
```

파일데이터를 api로 보내는 방법은 여러개가 있는데 흔히 사용하는방법은 파일 api를 구성하여 ContentType: multipart/form-data으로 주고받는 방법이다. 이렇게하면 api를 2개만들어서 params / blob형태를 각각 보내주면된다.
하지만, api쪽에서 json형식으로 한번에 받고자한다면, 위처럼 작성해주면된다.

## File Download

```tsx
const download = async (
  event: React.MouseEvent<HTMLButtonElement>,
  libVerId: number,
  libFilName: string
) => {
  event.stopPropagation();

  try {
    const data = await getFileDownolad({ libVerId });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(data);
    a.download = `${libFilName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error(error);
  }
};
```

api에서 경로가아니라 blob형태로 데이터가 온다면, 위처럼 blob를 url로 치환하여 download하는 방법을 선택하면 됩니다.
