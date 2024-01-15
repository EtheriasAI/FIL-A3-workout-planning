import { NodeFileSystem } from "langium/node";
import { CheckBreakpointArguments, CheckBreakpointResponse, GetBreakpointTypesResponse, GetRuntimeStateArguments, GetRuntimeStateResponse, InitArguments, InitResponse, ParseArguments, ParseResponse, StepArguments, StepResponse } from "./lrp.js";
import { createWorkoutPlanningServices } from "../language/workout-planning-module.js";
import { extractAstNode } from "./cli-util.js";
import { Model } from "../language/generated/ast.js";
import { IDRegistry } from "./id-registry.js";
import { ModelElementBuilder } from "../model-element-builder.js";
import { WorkoutState } from "../workout-state.js";

export class LRPServicesImpl {
    static registry: IDRegistry;
    static workout: Model;
    static workoutState: WorkoutState;
    
    static async parse(args: ParseArguments): Promise<ParseResponse> {
        const newRegistry: IDRegistry = new IDRegistry();
        LRPServicesImpl.registry = newRegistry;
        const services = createWorkoutPlanningServices(NodeFileSystem).WorkoutPlanning;
        const workoutAst = await extractAstNode<Model>(args.sourceFile, services);
        this.workout = workoutAst;

        const builder: ModelElementBuilder = new ModelElementBuilder(newRegistry);
        
        return {
            astRoot: builder.fromWorkout(workoutAst)
        }

    }
    static initExecution(args: InitArguments): InitResponse {
        if(!LRPServicesImpl.workout) { throw new Error("No workout parsed yet."); }
        this.workoutState = new WorkoutState(LRPServicesImpl.workout);
        return {
            isExecutionDone: this.workoutState.isFinished()
        }
    }
    static getRuntimeState(args: GetRuntimeStateArguments): GetRuntimeStateResponse {
        const builder = new ModelElementBuilder(LRPServicesImpl.registry);

        return {
            runtimeStateRoot: builder.fromWorkoutState(LRPServicesImpl.workoutState)
        }
    }
    static nextStep(args: StepArguments): StepResponse {
        LRPServicesImpl.workoutState.next();
        return {
            isExecutionDone: LRPServicesImpl.workoutState.isFinished()
        }
    }
    static getBreakpointTypes(): GetBreakpointTypesResponse {
        return {breakpointTypes: []};
    }
    static checkBreakpoint(args: CheckBreakpointArguments): CheckBreakpointResponse {
        throw new Error("Method not implemented.");
    }
}