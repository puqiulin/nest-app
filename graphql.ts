
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum LoverType {
    WANGJIE = "WANGJIE",
    PUQIULIN = "PUQIULIN"
}

export class CreateUserInput {
    name: string;
    email: string;
}

export class UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export interface Drink {
    name: string;
}

export class User {
    id: number;
    name: string;
    email: string;
    create_at: Date;
    update_at: Date;
}

export abstract class IQuery {
    users: User[];
    user?: User;
}

export abstract class IMutation {
    createUser?: User;
    updateUser?: User;
    deleteUser?: User;
}

export class Tea implements Drink {
    name: string;
}

export class WangJie {
    name: string;
}

export class PuQiuLin {
    name: string;
}

export abstract class ISubscription {
    userAdd: User;
}

export type Lover = WangJie | PuQiuLin;
type Nullable<T> = T | null;
