export interface ProfileFormProps {
    initialData?: {
        name?: string;
        age?: number;
        hobbies?: string[];
        profilePicture?: string;
    };
}

export interface ScheduleProps {
    userId: string;
    isOwnSchedule: boolean;
}