---
title: 'lodash 커스텀하여 Validation 활용'
description: ''
image: '/img/posts/tech.png'
draft: false
category: 'snippet'
subImage: '/img/posts/snippet.png'
date: 2024-01-16 22:06:43
tags:
  - validation
  - lodash
---



## Lodash 기반으로 작성한 소스입니다 참고바랍니다



## checkAllTrim

```tsx
/* check obj all empty value */
export const checkAllTrim = (obj: { [key in string]: string | number }):boolean  => {
  return Object.values(obj).every((ob) => String(ob).trim() === '')
}

/* 사용하는 곳 */
const validationManual = () => {
  return checkAllTrim({ titl: cardParams.titl, desc: cardParams.descrp })
}
```

어떤 글을 작성할 때, 화면단에서 저장 / 등록등의 이벤트를 행하기 전에, 사용자가 글자를 입력했는지 체크하는 함수이다. space를 누르게되면 공백이 생겨 길이가 1이상 생기므로, trim을 사용하여 공백을 없애고 글자수만 체크하도록 하였다. 

=> 입력된 글자가 한개이상도 없을 경우 true를 반환한다.



## isEmptyPropertyCheck

```tsx
export const isEmptyPropertyCheck =
      (obj: { [key in string]: unknown }) :boolean => !every(obj, isEmpty)
```

객체의 프로퍼티 값들이 모두 비워져있으면 false를 반환합니다. 

store / api에서 리턴된 데이터를 받을때 값의 유무를 체크할 때 유용합니다.



## isEmptyAnyPropertyCheck

```tsx
export const isEmptyAnyPropertyCheck = (obj: { [key in string]: unknown }) : boolean  => some(obj, (value) => isEmpty(trim(String(value))))
```

객체를 구성하는 키값들 중에서 하나라도 value값이 없다면 false를 반환합니다.

필수값을 체크하는데 유용합니다.



## isEmptyEveryCheck

```tsx
export const isEmptyEveryCheck = (obj: { [key in string]: unknown | unknown[] }):boolean  =>
  some(obj, (value, key) => {
    const keys = obj[key]
    if (Array.isArray(keys)) {
      return !every(keys, (item: unknown[]) => {
        return every(item, (value) => !isEmpty(String(value)))
      })
    }

    return isEmpty(String(value))
  })

```

객체 프로퍼티 value값들이 모두 값이 있으면 false 하나라도 없으면 true
객체안의 배열까지 점검해주는 벨리데이션
버튼 disabled 용이라 true /false 상황을 반대로했습니다.



## isArrayEmptyPropertyCheck

```tsx
export const isArrayEmptyPropertyCheck = (arr: unknown[]): boolean =>
  !every(arr, (item: unknown[]) => {
    return every(item, (value) => !isEmpty(value))
  })
```

배열안의 객체의 value값들이 모두 있으면 false / 하나라도 없으면 true를 반환합니다.



## 실제 사용해보기

```tsx
 const getDisabled = () => {
    if (!params) return
    const { exposureFrequencyCode, exposurePeriodTypeCode, ...rest } = params
    const paramsCheck = isEmptyEveryCheck(params.exposureTypeCode === 'NP02' ? params : rest)
   	const editorListCheck = editorList.length > 0 && isArrayEmptyPropertyCheck(editorList);
 
    return paramsCheck || editorListCheck
 }
```

rest문법으로 필수값과 필수값이 아닌 값을 구분하여 기획에따라 벨리데이션을 달리 체크하는 방식입니다.
이렇게하니 벨리데이션 체크가 아주 간단해집니다.

