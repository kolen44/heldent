import { create } from 'zustand'

export const useStores = create((set, get) => ({
	calendarPlan: '',
	setCalendarPlan: text => {
		set(state => ({
			calendarPlan: text,
		}))
	},
	personalAccountDynamicPage: 1,
}))
