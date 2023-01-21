// import {parse} from "csv-parse"
// import fs from "fs"
// import { Stream } from "stream"

// const results:any = []

// fs.createReadStream("kepler_data.csv")
// .on("data", (data) => {
//     results.push(data)
//     console.log(results)
// })
// .on("err", (err)=> {
//     console.log(err)
// })
// .on("end", ()=> {
//     console.log("file has been completely processed")
// })
// const results:any = []

// const data = fs.createReadStream("kepler_data.csv")
//                 .pipe(parse({
//                     comment:"#",
//                     columns: true
//                 }))
//                 .on("data", (data)=> {
//                     results.push(data)
//                     console.log(results)
//                 })
//                 .on("err", (err) => {
//                     console.log(err)
//                 })
//                 .on("end", ()=>{
//                     console.log("file has been completely processed")
//                 })

// .parse()

// habitable planets

// import {parse} from "csv-parse"
// import fs from "fs"

// const habitablePlanets:any = []

// const isHabitablePlanets = (planet: any)=> {
//     return planet["koi_disposition"] === "CONFIRMED" &&
//             planet["koi_insol"] > 0.36 &&
//             planet["koi_insol"] < 1.11 &&
//             planet["koi_prad"] < 1.6
// }

// fs.createReadStream("kepler_data.csv")
//     .pipe(parse({
//         comment: "#",
//         columns: true
//     }))
//     .on("data", (data:any) => {
//         if (isHabitablePlanets(data)) {
//         return habitablePlanets.push(data)
//         }
//     })
//     .on("err", (err:any) => {
//         console.log(err)
//     })
//     .on("end", () => {
//         // console.log(`there are ${habitablePlanets.length} number of habitable planets`)
//         console.log(habitablePlanets)
//         console.log("file completely processed")
//     })

import {parse} from "csv-parse"
import fs from "fs"

const unInhabitablePlanets: any[] = []
const habitablePlanets: any[] = []

const isHabitable = (planet: any) => {
    return planet["koi_disposition"] === "CONFIRMED" &&
            planet["koi_insol"] > 0.36 &&
            planet["koi_insol"] < 1.11 &&
            planet["koi_prad"] <  1.6
}

const isNotHabitable = (planet: any) => {
    return planet["koi_disposition"] === "FALSE POSITIVE" &&
            planet["koi_insol"] > 0.36 &&
            planet["koi_insol"] < 1.11 &&
            planet["koi_prad"] < 1.6
}

fs.createReadStream("kepler_data.csv")
    .pipe(parse({
        comment: "#",
        columns: true
    }))
    .on("data", (data) => {
        if (isHabitable(data)) {
            return habitablePlanets.push(data)
        }
        if(isNotHabitable(data)) {
            return unInhabitablePlanets.push(data)
        }
    })
    .on("err", (err) => {
        console.log(err)
    })
    .on("end", () => {
        console.log(`there are ${habitablePlanets.length} habitable planets and ${unInhabitablePlanets.length} uninhabitable planets`)
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name']
        }))
        console.log(unInhabitablePlanets.map((planet) => {
            return planet["kepoi_name"]
        }))
        console.log("request has been completely processed")
    })