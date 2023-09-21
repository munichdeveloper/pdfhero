
export const getServerSideProps = (async (context) => {
    const res = await fetch('https://hook.eu1.make.com/re7r6vil5o33eya6tsqtkc3v1v5onwjy')
    const repo = await res.json()
    return { props: { repo } }
  })