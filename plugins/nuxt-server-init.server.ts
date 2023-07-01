import useGlobalStore from '~/store/index'

export default async (context) => {
  const store = useGlobalStore(context.$pinia) as any
  await store.nuxtServerInit(context)
}
