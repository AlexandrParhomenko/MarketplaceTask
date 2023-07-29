import Head from 'next/head'
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {setStore} from "@/store/reducers/storeSlice";
import {useDispatch} from "react-redux";
import {dataContainer, shop, shopPage} from "@/types/types";


export const getStaticProps: GetStaticProps<{
    repo: dataContainer
}> = async () => {
    const res = await fetch('https://dummyjson.com/carts')
    const repo = await res.json()
    return { props: { repo } }
}
export default function Home({repo,
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
    const dispatch = useDispatch()
    dispatch(setStore(repo.carts))

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/*<div>{repo.carts.map(el => el.id)}</div>*/}
      <Header/>
      <Main/>
    </>
  )
}
