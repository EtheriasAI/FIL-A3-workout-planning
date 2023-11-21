import { Day, Exercise, Model } from '../language/generated/ast.js';
import * as fs from 'node:fs';
import { CompositeGeneratorNode, NL, toString } from 'langium';
import * as path from 'node:path';
import { extractDestinationAndName } from './cli-util.js';

export function generateJavaScript(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);
    //model.greetings.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.person.ref?.name}!');`, NL));

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, toString(fileNode));
    return generatedFilePath;
}


export function act(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.txt`;

    const fileNode = new CompositeGeneratorNode();
    fileNode.append('"use strict";', NL, NL);
    model.exercises.forEach(exo => fileNode.append(`console.log('Hello, ${exo.name}!');`, NL));
    model.days.forEach(day => fileNode.append(`console.log('Hello, ${day.name}!');`, NL));
    const calendrier = new Map<Day, Exercise[]>();

    let exo1 = model.exercises[0]
    let exo2 = model.exercises[1]
    let listof = [exo1, exo2]
    //listof.add(exo1)
    //listof.Add(exo2)
    calendrier.set(model.days[0],listof)

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    console.log(calendrier)
    fs.writeFileSync(generatedFilePath, convertCalendarToString(calendrier));
    return generatedFilePath;
}



function convertCalendarToString(calendrier: Map<Day, Exercise[]>): string {
    let resultString = '';


    for (const [day, exercises] of calendrier.entries()) {
        resultString += `Day: ${day.name}, Body Part: ${day.bodyPart}\n`;

        for (const exercise of exercises) {
            resultString += `  Exercise: ${exercise.name}, Body Part: ${exercise.bodyPart}\n`;
        }
    }

    return resultString;
}