import type { Model } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { WorkoutPlanningLanguageMetaData } from '../language/generated/module.js';
import { createWorkoutPlanningServices } from '../language/workout-planning-module.js';
import { extractAstNode } from './cli-util.js';
import { generateWorkoutPlan } from './generator.js';
import { NodeFileSystem } from 'langium/node';

export const generate = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createWorkoutPlanningServices(NodeFileSystem).WorkoutPlanning;
    const model = await extractAstNode<Model>(fileName, services);
    const generatedFilePath = generateWorkoutPlan(model, fileName, opts.destination);
    console.log(chalk.green(`Text file generated successfully: ${generatedFilePath}`));
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    const fileExtensions = WorkoutPlanningLanguageMetaData.fileExtensions.join(', ');
    
    program
        .version('0.0.1')
        .command('generate')
        .option('-d, --destination <dir>', 'destination directory of generating')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .action(generate);

    program.parse(process.argv);
}
