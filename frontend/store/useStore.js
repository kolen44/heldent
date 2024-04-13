import { create } from 'zustand'

export const useStores = create((set, get) => ({
	calendarPlan: '',
	video: '',
	setCalendarPlan: text => {
		set(state => ({
			calendarPlan: text,
		}))
	},
	setVideo: text => {
		set(state => ({
			video: text,
		}))
	},
	personalAccountDynamicPage: 1,
}))
