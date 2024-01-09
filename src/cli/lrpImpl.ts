import { NodeFileSystem } from "langium/node";
import { BreakpointType, CheckBreakpointArguments, CheckBreakpointResponse, GetBreakpointTypesResponse, GetRuntimeStateArguments, GetRuntimeStateResponse, InitArguments, InitResponse, LRPServices, Location, ModelElement, ParseArguments, ParseResponse, StepArguments, StepResponse } from "./lrp.js";
import { createWorkoutPlanningServices } from "../language/workout-planning-module.js";
import { extractAstNode } from "./cli-util.js";
import { Model } from "../language/generated/ast.js";
import { IDRegistry } from "./id-registry.js";
import { ModelElementBuilder } from "../model-element-builder.js";

class LRPServicesImpl implements LRPServices {
    static registries: Map<string, IDRegistry> = new Map();
    
    async parse(args: ParseArguments): Promise<ParseResponse> {
        const newRegistry: IDRegistry = new IDRegistry();
        LRPServicesImpl.registries.set(args.sourceFile, newRegistry);
        const services = createWorkoutPlanningServices(NodeFileSystem).WorkoutPlanning;
        const workoutAst = await extractAstNode<Model>(args.sourceFile, services);
        
        const builder: ModelElementBuilder = new ModelElementBuilder(newRegistry);
        
        return {
            astRoot: builder.fromWorkout(workoutAst)
        }

    }
    initExecution(args: InitArguments): InitResponse {
        throw new Error("Method not implemented.");
    }
    getRuntimeState(args: GetRuntimeStateArguments): GetRuntimeStateResponse {
        throw new Error("Method not implemented.");
    }
    nextStep(args: StepArguments): StepResponse {
        throw new Error("Method not implemented.");
    }
    getBreakpointTypes(): GetBreakpointTypesResponse {
        throw new Error("Method not implemented.");
    }
    checkBreakpoint(args: CheckBreakpointArguments): CheckBreakpointResponse {
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

export class ModelElementImpl implements ModelElement {
    id: string;
    type: string;
    children: { [key: string]: ModelElement | ModelElement[]; };
    refs: { [key: string]: string | string[]; };
    attributes: { [key: string]: any; };
    location?: Location | undefined;

    constructor(
        id: string,
        type: string,
        children: { [key: string]: ModelElement | ModelElement[] },
        refs: { [key: string]: string | string[]; },
        attributes: { [key: string]: any; },
        location?: Location | undefined,
    ) {
        this.id = id;
        this.type = type;
        this.children = children;
        this.refs = refs;
        this.attributes = attributes;
        this.location = location;
    }
    
}

class StepResponseImpl implements StepResponse {
    isExecutionDone: boolean;

}