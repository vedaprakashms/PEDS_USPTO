<template>
    <div class="container">
        <fileinput msg="application" />
        <h3>
            <span class="badge bg-success"> OR </span>
        </h3>
        <div class="input-group mb-3">
            <textarea
                class="form-control"
                placeholder="Input application numbers here "
                rows="15"
                v-model="message"
            ></textarea>
        </div>
        <div class="row">
            <div class="col align-self-end">
                <button
                    class="btn btn-success"
                    type="button"
                    id="button-addon2"
                    @click="postMessage"
                >
                    Get Legal Status Details!!!
                </button>
            </div>
        </div>

        <div class="progress my-2">
            <div
                class="progress-bar progress-bar-striped bg-info progress-bar-animated"
                :style="[progressWidth, pbarHeight]"
            >
                {{ progressPercent }}%
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { toUpperCase } from "@/workers/worker-api"
import fileinput from "@/components/fileinput.vue"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { app } from "@electron/remote"

export default defineComponent({
    props: {
        fileinput: String,
    },
    data() {
        return {
            progressWidth: { width: "0%" },
            progressPercent: 0,
            pbarHeight: { height: "20px" },
            message: "",
        }
    },
    components: { fileinput },
    setup(props) {
        return { props }
    },
    methods: {
        updateProgress() {
            var i = setInterval(() => {
                this.progressWidth.width = this.progressPercent.toString() + "%"
                this.progressPercent++
                if (this.progressPercent <= 100) {
                    clearInterval(i)
                }
            }, 500)
        },
        async postMessage() {
            console.log(this.message)
            const result = await toUpperCase(this.message)
            console.log(result)
        },
    },
})
</script>

<style></style>
