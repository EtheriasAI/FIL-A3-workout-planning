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

        return new ModelElementImpl(
            this.registry.getOrCreateASTId(workout),
            workout.$type,
            {
                days: days,
                exercises: exercises
            },
            {},
            {}
        );
    }

    public fromDay(day: Day): ModelElement {
        return new ModelElementImpl(
            this.registry.getOrCreateASTId(day),
            day.$type,
            {},
            {},
            {
                bodyParts: day.bodyParts,
                duration: day.duration,
                name: day.name
            }
        );
    }

    public fromExercise(exercise: Exercise): ModelElement {
        return new ModelElementImpl(
            this.registry.getOrCreateASTId(exercise),
            exercise.$type,
            {},
            {},
            {
                bodyPart: exercise.bodyPart,
                duration: exercise.duration,
                kcal: exercise.kcal,
                name: exercise.name
            }
        );
    }
}