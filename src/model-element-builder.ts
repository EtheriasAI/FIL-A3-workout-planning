import { IDRegistry } from "./cli/id-registry.js";
import { ModelElement } from "./cli/lrp.js";
import { DayState } from "./day-state.js";
import { ExerciseState } from "./exercise-state.js";
import { Day, Exercise, Model } from "./language/generated/ast.js";
import { WorkoutState } from "./workout-state.js";

export class ModelElementBuilder {
    constructor(private registry: IDRegistry) { }
    
    public fromWorkout(workout: Model): ModelElement {
        const exercises: ModelElement[] = []
        workout.exercises.forEach(exercise => {
            exercises.push(this.fromExercise(exercise));
        });
        
        const days: ModelElement[] = [];
        workout.days.forEach(day => {
            days.push(this.fromDay(day));
        });

        return {
            id: this.registry.getOrCreateASTId(workout),
            type: workout.$type,
            children: {
                days: days,
                exercises: exercises
            },
            refs: {},
            attributes: {}
        } as ModelElement;
    }

    public fromDay(day: Day): ModelElement {
        return {
            id: this.registry.getOrCreateASTId(day),
            type: day.$type,
            attributes: {
                bodyParts: day.bodyParts,
                duration: day.duration,
                name: day.name
            },
            refs: {},
            children: {}
        } as ModelElement;
    }

    public fromExercise(exercise: Exercise): ModelElement {
        return {
            id: this.registry.getOrCreateASTId(exercise),
            type: exercise.$type,
            attributes: {
                bodyPart: exercise.bodyPart,
                duration: exercise.duration,
                name: exercise.name
            },
            refs: {},
            children: {}
        } as ModelElement;
    }

    public fromWorkoutState(workoutState: WorkoutState): ModelElement {
        const exercises: ModelElement[] = [];
        workoutState.exercises.forEach(exercise => {
            exercises.push(this.fromExerciseState(exercise));
        });

        const days: ModelElement[] = [];
        workoutState.days.forEach(day => {
            days.push(this.fromDayState(day));
        });

        return {
            id: this.registry.getOrCreateRuntimeId(workoutState),
            type: "WorkoutState",
            children: {
                days: days,
                exercises: exercises
            },
            refs: {
                workout: this.registry.getOrCreateASTId(workoutState.workout)
            },
            attributes: {}
        }
    }

    public fromExerciseState(exerciseState: ExerciseState): ModelElement {
        return {
            id: this.registry.getOrCreateRuntimeId(exerciseState),
            type: "ExerciseState",
            children: {},
            refs: {
                exercise: this.registry.getOrCreateASTId(exerciseState.exercise)
            },
            attributes: {}
        }
    }

    public fromDayState(dayState: DayState): ModelElement {
        return {
            id: this.registry.getOrCreateRuntimeId(dayState),
            type: "DayState",
            children: {},
            refs: {
                day: this.registry.getOrCreateASTId(dayState.day)
            },
            attributes: {}
        }
    }
}