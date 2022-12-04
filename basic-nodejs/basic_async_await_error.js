// haimtran 02 DEC 2022 
// basic nodejs 
// callback, promise and async await 

// =========================================
// use setTimeout as the most simple of callback
// question how setTimeout implemented?
// =========================================
setTimeout(() => {
  console.log("Hello callback")
}, 2000)


// =========================================
// promise, resolve and reject 
// =========================================
console.log("Hello Hai Tran")
// promise, resolve and reject 
const promise = new Promise((resolve, reject) => {
  if (1 == 0) {
    resolve("Hai Tran")
  } else {
    reject("Minh Tran")
    }
})
promise
  .then((val) => console.log("Hello: ", val))
  .catch((error) => console.log("There is an error: ", error))

const p1 = new Promise((resolve, reject) => {
  if (1 == 0) {
    resolve("Hai Tran")
  } else {
    throw new Error("Error Thrown")
  }
}) 

p1
  .then((val) => console.log("Hello: ", val))
  .catch((error) => console.log("There is an   error: ", error.message))

// =========================================
// async and await 
// =========================================
const a1 = async () => {
  console.log("start fetching data ....")
  // create a promise 
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  })
  // call the promise without passing resolve and reject 
  let result = await promise
  console.log("done fetching data ")
}
a1()
// 
const a2 = async () => {
  console.log("start computing the image ...")
  // create and call a promise without passing resolve and reject
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 2000)
  })
  console.log("done image ")
}
a2()

// =========================================
// async and await and eror handling 
// throw a specific type of error 
// =========================================
const a3 = async () => {
  throw EvalError("Error from async")
}

const a4 = async () => {
  try {
    let result = await a3()
  } catch (error) {
    if (error instanceof EvalError) {
      console.log("EvalError, ", error.message)
    }
  }
}

a4()