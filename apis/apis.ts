import { AxiosResponse } from "axios";
import http from "./http";
import { Root } from "@/types/type";
import { RootDetails } from "@/types/details.type";
import { RootChapter } from "@/types/chapter.type";

const apis = {
    homeApi: async (): Promise<Root> => {
        const res = await http.get('/home')
        return res.data as Root
    },
    detailsApi: async (slug: string): Promise<RootDetails> => {
        const res = await http.get(`/truyen-tranh/${slug}`)
        return res.data as RootDetails
    },
    chapterApi: async (chapterUrl: string): Promise<RootChapter> => {
        const res = await http.get(chapterUrl)
        return res.data as RootChapter
    },
}

export default apis