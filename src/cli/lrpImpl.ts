import { NodeFileSystem } from "langium/node";
import { BreakpointType, CheckBreakpointArguments, CheckBreakpointResponse, GetBreakpointTypesResponse, GetRuntimeStateArguments, GetRuntimeStateResponse, InitArguments, InitResponse, LRPServices, Location, ModelElement, ParseArguments, ParseResponse, StepArguments, StepResponse } from "./lrp.js";
import { createWorkoutPlanningServices } from "../language/workout-planning-module.js";
import { extractAstNode } from "./cli-util.js";
import { Model } from "../language/generated/ast.js";
import { IDRegistry } from "./id-registry.js";
import { ModelElementBuilder } from "../model-element-builder.js";
import { WorkoutState } from "../workout-state.js";

class LRPServicesImpl implements LRPServices {
    static registry: IDRegistry;
    static workout: Model;
    static workoutState: WorkoutState;
    
    static async parse(args: ParseArguments): Promise<ParseResponse> {
        const newRegistry: IDRegistry = new IDRegistry();
        LRPServicesImpl.registry = newRegistry;
        const services = createWorkoutPlanningServices(NodeFileSystem).WorkoutPlanning;
        const workoutAst = await extractAstNode<Model>(args.sourceFile, services);
        
        const builder: ModelElementBuilder = new ModelElementBuilder(newRegistry);
        
        return {
            astRoot: builder.fromWorkout(workoutAst)
        }

    }
    static initExecution(args: InitArguments): InitResponse {
        if(!LRPServicesImpl.workout) { throw new Error("No workout parsed yet."); }
        this.workoutState = new WorkoutState(LRPServicesImpl.workout);
        return {
            // TODO: isExecutionDone should be true when the workout is done
            isExecutionDone: false
        }
    }
    static getRuntimeState(args: GetRuntimeStateArguments): GetRuntimeStateResponse {
        throw new Error("Method not implemented.");
    }
    static nextStep(args: StepArguments): StepResponse {
        throw new Error("Method not implemented.");
    }
    static getBreakpointTypes(): GetBreakpointTypesResponse {
        throw new Error("Method not implemented.");
    }
    static checkBreakpoint(args: CheckBreakpointArguments): CheckBreakpointResponse {
        throw new Error("Method not implemented.");
    }
}


class InitResponseImpl implements InitResponse {
    isExecutionDone: boolean;
}

class GetRuntimeStateResponseImpl implements GetRuntimeStateResponse {
    runtimeStateRoot: ModelElement;

}

class CheckBreakpointResponseImpl implements CheckBreakpointResponse {
    isActivated: boolean;
    message?: string | undefined;
}

class GetBreakpointTypesResponseImpl implements GetBreakpointTypesResponse {
    breakpointTypes: BreakpointType[];

}

class StepResponseImpl implements StepResponse {
    isExecutionDone: boolean;

}