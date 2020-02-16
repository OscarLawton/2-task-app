const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a+b)
        }, 2000)
    })
}

const doWork = async () =>{
   
   const result = await add(4,7)
   return result
}

console.log(doWork().then((result) => {
    console.log(result)
}))