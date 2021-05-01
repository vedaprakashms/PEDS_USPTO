<template>
    <div class="input-group mb-3">
        <input
            type="file"
            class="form-control btn-outline-success"
            placeholder="File input"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="filedata($event)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { jsonDisp } from "@/workers/worker-api"
import XLSX from "xlsx"

export default defineComponent({
    props: {
        msg: String,
    },
    setup(props) {
        console.log(props.msg)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var filedata = async (e: any) => {
            console.log(e.type)
            console.log(e.target.files[0].path)
            const dt = XLSX.readFile(e.target.files[0].path, {})
            const fws = dt.Sheets[dt.SheetNames[0]]
            var wb = XLSX.utils.sheet_to_json(fws, { header: 1 })
            await jsonDisp(wb)
        }

        return { filedata }
    },
})
</script>

<style></style>
