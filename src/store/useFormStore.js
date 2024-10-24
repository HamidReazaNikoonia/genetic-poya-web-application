import { create } from 'zustand'

export const useFormStore = create((set) => ({
    formData: {
        lastName: '',
        firstName: '',
        age: null,
        gender: "M",
        mariageType: "NON_FAMILY",
        parentMariageType: "NON_FAMILY",
    },
    consultQuestions: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
    },
    consultResult: {
        consultId: null,
        consultResult: null
    },
    // updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
    updateconsultResult: ({consultId, consultResult}) => set(() => ({consultResult: {consultId, consultResult}})),
    updateconsultQuestions: ({name, value}) => set((state) => ({consultQuestions: {...state.consultQuestions, [name]: value}})),
    updateformData: ({name, value}) => set((state) => ({ formData: {...state.formData, [name]: value} })),
}))