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
        1: true,
        2: false,
        3: true,
        4: false,
        5: true,
        6: false,
        7: true,
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