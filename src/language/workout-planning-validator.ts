import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { WorkoutPlanningAstType, Person } from './generated/ast.js';
import type { WorkoutPlanningServices } from './workout-planning-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: WorkoutPlanningServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.WorkoutPlanningValidator;
    const checks: ValidationChecks<WorkoutPlanningAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class WorkoutPlanningValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
