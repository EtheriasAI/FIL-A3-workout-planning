import { WorkoutGenerator } from "./cli/generator.js";
import { Model } from "./language/generated/ast.js";

export class WorkoutState {
    readonly workout: Model;
    workoutGenerator: WorkoutGenerator;
    
    constructor(workout: Model){
        this.workout = workout;
        this.workoutGenerator = new WorkoutGenerator(workout);
    }

    next() {
        this.workoutGenerator.populateDay();
    }

    isFinished(): boolean {
        return this.workoutGenerator.isFinished();
    }
}