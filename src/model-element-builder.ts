import { IDRegistry } from "./cli/id-registry.js";
import { ModelElement } from "./cli/lrp.js";
import { ModelElementImpl } from "./cli/lrpImpl.js";
import { Day, Exercise, Model } from "./language/generated/ast.js";

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
}