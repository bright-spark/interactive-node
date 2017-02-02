export class BaseError extends Error {
    constructor(public message) {
        super(message);
    }
}

export class CancelledError extends BaseError {
    constructor() {
        super("Packet was cancelled or Carina was closed before a reply was received.");
    }
}

export class TimeoutError extends BaseError {
}

export class MessageParseError extends BaseError {
}

export module ConstellationError {
    export class Base extends BaseError {
        constructor(public code: number, message: string) {
            super(message);
        }
    }

    const errors = {};

    export function from({ code, message }: { code: number, message: string }) {
        if (errors[code]) {
            return new errors[code](message);
        }

        return new Base(code, message);
    }

    export class InvalidPayload extends Base {
        constructor(message: string) {
            super(4000, message);
        }
    }
    errors[4000] = InvalidPayload;

    export class PayloadDecompression extends Base {
        constructor(message: string) {
            super(4001, message);
        }
    }
    errors[4001] = PayloadDecompression;

    export class UnknownPacketType extends Base {
        constructor(message: string) {
            super(4002, message);
        }
    }
    errors[4002] = UnknownPacketType;

    export class UnknownMethodName extends Base {
        constructor(message: string) {
            super(4003, message);
        }
    }
    errors[4003] = UnknownMethodName;

    export class InvalidMethodArguments extends Base {
        constructor(message: string) {
            super(4004, message);
        }
    }
    errors[4004] = InvalidMethodArguments;

    export class EtagMismatch extends Base {
        constructor(message: string) {
            super(4005, message);
        }
    }
    errors[4005] = EtagMismatch;

    export class InvalidTransactionId extends Base {
        constructor(message: string) {
            super(4007, message);
        }
    }
    
    errors[4007] = InvalidTransactionId;

    export class NotEnoughSparks extends Base {
        constructor(message: string) {
            super(4008, message);
        }
    }
    
    errors[4008] = NotEnoughSparks;

    export class UnknownGroup extends Base {
        constructor(message: string) {
            super(4009, message);
        }
    }

    errors[4009] = UnknownGroup;

    export class GroupAlreadyExists extends Base {
        constructor(message: string) {
            super(4010, message);
        }
    }
    
    errors[4010] = GroupAlreadyExists;

    export class UnknownSceneId extends Base {
        constructor(message: string) {
            super(4011, message);
        }
    }
    
    errors[4011] = UnknownSceneId;

    export class SceneAlreadyExists extends Base {
        constructor(message: string) {
            super(4012, message);
        }
    }
    
    errors[4012] = SceneAlreadyExists;

    export class UnkownControlId extends Base {
        constructor(message: string) {
            super(4013, message);
        }
    }
    
    errors[4013] = UnkownControlId;

    export class ControlAlreadyExists extends Base {
        constructor(message: string) {
            super(4014, message);
        }
    }
    
    errors[4014] = ControlAlreadyExists;

    export class UnkownControlType extends Base {
        constructor(message: string) {
            super(4015, message);
        }
    }
    
    errors[4015] = UnkownControlType;
}
