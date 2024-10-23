import { generatePuzzle } from './utils/puzzleGenerator';
import { solvePuzzle } from './utils/puzzleSolver';
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const outputDir = "./solutions";
// month starts from 0
// day starts from 1
const month = process.env.MONTH == null ? process.exit(1) : parseInt(process.env.MONTH)
DAY_LOOP: for (let day = 1; day <= 31; day++) {
    const date = new Date(2024, month, day)
    const outputFileName = `${outputDir}/${month}_${day}.json`
    if (date.getMonth() != month) {
        console.log(`Skip invalid date ${month} ${day}`)
    } else if (fs.existsSync(outputFileName)) {
        console.log(`Skip already solved date ${month} ${day}`)
    } else {
        const solutions = solvePuzzle(generatePuzzle(new Date(2024, month, day)))
        fs.writeFileSync(outputFileName, JSON.stringify(solutions));
    }

}
// const date = 1
// const solutions = solvePuzzle(generatePuzzle(new Date(2024, month, date)))
// const outputDir = "./solutions";
// fs.writeFileSync(`${outputDir}/${month}_${date}.json`, JSON.stringify(solutions));
// console.log(solutions);