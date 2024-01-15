import { WorkoutGenerator } from "./cli/generator.js";
import { DayState } from "./day-state.js";
import { ExerciseState } from "./exercise-state.js";
import { Model } from "./language/generated/ast.js";

export class WorkoutState {
    readonly workout: Model;
    readonly exercises: ExerciseState[];
    readonly days: DayState[];
    workoutGenerator: WorkoutGenerator;
    
    constructor(workout: Model){
        this.workout = workout;
        this.exercises = workout.exercises.map(exercise => new ExerciseState(exercise));
        this.days = workout.days.map(day => new DayState(day));
        
        this.workoutGenerator = new WorkoutGenerator(workout);
    }

    next() {
        this.workoutGenerator.populateDay();
    }

    isFinished(): boolean {
        return this.workoutGenerator.isFinished();
    }
}