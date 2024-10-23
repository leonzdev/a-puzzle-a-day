import { generatePuzzle } from './utils/puzzleGenerator';
import { solvePuzzle } from './utils/puzzleSolver';
import * as fs from 'fs'

const outputDir = "./public/solutions";
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
