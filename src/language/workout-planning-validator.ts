import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { WorkoutPlanningAstType, Day } from './generated/ast.js';
import type { WorkoutPlanningServices } from './workout-planning-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: WorkoutPlanningServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.WorkoutPlanningValidator;
    const checks: ValidationChecks<WorkoutPlanningAstType> = {
        Day: validator.checkDayNotNull
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class WorkoutPlanningValidator {

    checkDayNotNull(day: Day, accept: ValidationAcceptor): void {
        if (day.name===null) {
            accept('warning', 'Need an exercise name.',{ node:day });
        }
    }

}
