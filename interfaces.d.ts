
type Int = number & {__int__: void};

interface Totaluser {
    date: Date,
    number_of_users: Int
}


export type {Totaluser};