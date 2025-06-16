---
title: '알짜배기 함수모음(1)'
description: ''
image: '/img/posts/tech.png'
draft: false
category: 'snippet'
subImage: '/img/posts/snippet.png'
date: 2024-01-17 22:06:43
tags:
  - 알짜배기함수모음
---

## Lodash 기반으로 작성한 소스입니다 참고바랍니다

## filterNonEmptyValues

```tsx
const res = {
  guideNumber: 0,
  title: '',
  moveParameter: '',
  guideAttachmentRequestList: [],
};

export const filterNonEmptyValues = (res: { [key in string]: unknown }) =>
  omitBy(res, (val) => isEmpty(val) && !isNumber(val));
```

빈 값을 없애고 필터링하여 객체를 반환해주는 함수입니다. 위의 예시처럼 res의 값중에 빈값을 제거하여 나머지값들을 반환해줍니다.

## initDataWithRes

```tsx
const initData = {
  guideNumber: 0,
  title: '',
  moveParameter: '',
  guideAttachmentRequestList: [],
};

export const initDataWithRes = (
  initData: { [key in string]: unknown },
  res: { [key in string]: unknown }
) => {
  const clone = filterNonEmptyValues(res);
  const cloneKey = Object.keys(clone);
  return Object.keys(initData).reduce(
    (result, key) => {
      if (cloneKey.includes(key)) {
        result[key] = clone[key];
      }
      return result;
    },
    {} as { [key in string]: unknown }
  );
};
```

Api에서 받은 response data를 초기설정해주는 함수입니다. 이 함수의 장점은 graph ql처럼 필요한 데이터만 초기세팅할 수있다는 점입니다. 예를들어, 위의 response data에서 많은 데이터가 있다고 가정했을때, 그중에서 필요한 데이터는 initData에 들어이는 키만 필요한 상황이라면 유용하게 사용할 수있습니다. 또 한, 처음에 가지고 있어야할 데이터가 initData라고 가정한다면 이는 필수 값이라고도 볼 수있습니다. 단순히 화면에서 조회만하는 페이지가 아니라, 받자마자 필수값을 확인하여 버튼에 disabled처리를 해야하는 상황이라면 데이터에서 받은 부분을 바로 벨리데이션 해야합니다. 이때 disabled의 조건은 다음과 같습니다.

- title/moveParameter/guideAttachmentRequestList의 값이 필수값이다. 없다면 버튼을 비활성화시켜야합니다.
- guideNumber은 쿼리로 던져야하므로 필수값입니다.

단순히 1대1이 아니라 1대N일 경우 이는 유용하게 사용할 수있습니다. 데이터를 필수값만 초기설정하고 옵셔널값은 추후에 추가해주면 되기때문입니다.

## getQueryParameter

```tsx
export const getQueryParameter = (params: {
  [key in string]: string | number;
}) => {
  return Object.entries(params)
    .filter(([_, value]) => !isEmpty(value?.toString()))
    .map(([key, value]) => `&${key}=${value}`)
    .join('');
};
```

객체로 던져인 데이터를 기반으로 URL 쿼리를 형성해주는 함수입니다.

## setKeyMappingData

```tsx
export const setKeyMappingData = (descTitleArr: string[], listInfoValueArr: (string | number | undefined)[]) => {
  return descTitleArr.reduce(
    (
      accumulator: {
        listTitle: string
        listInfo: string | number | undefined
      }[],
      currentTitle,
      index
    ) => {
      const currentInfo = listInfoValueArr?.[index]
      if (currentInfo !== undefined) {
        accumulator.push({ listTitle: currentTitle, listInfo: currentInfo })
      }
      return accumulator
    },
    []
  )
}
--- use---
const setDescList = useMemo(() => {
 if (!isEmptyCheck(data)) return []
 const { termsNum, termsCategoryName, releaseDate, version } = termsData
 const descTitleArr = ['No.', 'Category', 'Release Date', 'Version']
 const listInfoValueArr = [String(termsNum), termsCategoryName,releaseDate, version]

 return setDescListData(descTitleArr, listInfoValueArr)
}, [data])
```

첫번째 인자인 descTitleArr배열의 문자열이 객체의 키값이되고, value는 listInfoValueArr의 값이된다.
1대1 매칭으로 구성하여 세팅할 수 있다.

## selectInitValue

```tsx
const res = {
  category: [
    {
      value: 'test',
      name: 'Test',
      sortNum: 1,
    },
  ],
};

const selectInitValue = (listArr: { [key in string]: unknown }) =>
  Object.fromEntries(
    Object.entries(listArr).map(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return [key, [{ value: '', name: 'All' }, ...value]];
      } else {
        return [key, [{ value: '', name: 'All' }]];
      }
    })
  );
```

보통 reduce를 이용하여 promise.allSettled를 실행할때 반환되는 데이터형식입니다. api에서 all을 주지않는 경우가 많습니다. 그래서 프론트에서 데이터에 추가가공을 해줘야하는데 이때 유용한 함수입니다.
