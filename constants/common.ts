//media query list
export const media = {
  pc_99: {
    name: 'pc_99',
    width: 1920,
  },
  pc_00: {
    name: 'pc_00',
    width: 1720,
  },
  pc_01: {
    name: 'pc_01',
    width: 1660,
  },
  pc_02: {
    name: 'pc_02',
    width: 1460,
  },
  pc_03: {
    name: 'pc_03',
    width: 1280,
  },
  pc_03_a: {
    name: 'pc_03_a',
    width: 1200,
  },
  pc_04: {
    name: 'pc_04',
    width: 1024,
  },
  mb_00: {
    name: 'mb_00',
    width: 992,
  },
  mb_01: {
    name: 'mb_01',
    width: 768,
  },
  mb_02: {
    name: 'mb_02',
    width: 640,
  },
  mb_03: {
    name: 'mb_03',
    width: 550,
  },
  mb_04: {
    name: 'mb_04',
    width: 481,
  },
} as any
const mediaQueryDefaultOpt = {
  direction: '',
  tempDirection: '',
  isChange: false,
}
const objMediaQuery = {} as any
for (const key in media) {
  if (Object.hasOwnProperty.call(media, key)) {
    const item = media[key]
    objMediaQuery[key] = {
      width: item.width,
      ...mediaQueryDefaultOpt,
    }
  }
}
export const mediaQuery = objMediaQuery
