import { create } from 'zustand'

export const useFormStore = create((set) => ({
    formData: {
        lastName: '',
        firstName: '',
        age: null,
        gender: "M",
        mariageType: "NON_FAMILY",
        parentMariageType: "NON_FAMILY"
    },
    // updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
    updateformData: ({name, value}) => set((state) => ({ formData: {...state.formData, [name]: value} })),
}))