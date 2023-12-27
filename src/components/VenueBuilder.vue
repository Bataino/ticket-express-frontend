
<template>
    <div :class="class" :style="style" class="w-100">
        <div class="w-fit">
            <v-stage :config="stageConfig" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown" ref="stage">
                <v-layer ref="layer">

                    <component v-for="(shape, index) in shapes" :key="index" :is="shape.type" v-bind="shape.attrs"
                        @transformend="handleTransformEnd" @dragend="handleDragEnd">
                        <v-rect v-if="shape.seats" v-for="(seat, index) in shape.seats"
                            v-bind="{ width: 10, height: 10, name: `chair${index}-${shape.attrs.name}`, x: seat.x, y: seat.y, fill: shape.attrs.fill }" />
                    </component>
                    <v-transformer ref="transformer" />
                    <!-- </v-group> -->

                    <!-- Render seats -->
                    <!-- <v-group v-for="(seatG, index) in seatGroups" :key="index" v-bind="{ draggable: true }">

                    </v-group> -->
                </v-layer>
            </v-stage>

            <div class="d-flex align-items-center">
                <!-- <h2>Shapes</h2> -->
                <button type="button" class="p-3 border-0 m-2 rounded-circle bg-dark" @click="addCircle"></button>
                <button type="button" class="p-3 border-0 me-2 bg-dark" @click="addSquare"></button>
                <!-- <button type="button" @click="addDoughnut">Add Doughnut</button>
                <button type="button" @click="addPolygon">Add Polygon</button>
                <button type="button" @click="addTriangle">Add Triangle</button> -->
                <button type="button" class="p-3 border-0 me-2 bg-dark" @click="addText">
                    Add text
                </button>
                <button type="button" @click="moveUp" class="border-0 bg-transparent">
                    <icon icon="gis:layer-upload" class="fs-2" />
                </button>
                <button type="button" class="border-0 bg-transparent" @click="moveDown">
                    <icon icon="gis:layer-upload" :rotate="2" class="fs-2" />
                </button>
                <button type="button" class="border-0 bg-transparent">
                    <color-picker v-model="color" @change="changeColour" :disabled="!selectedShape?.attrs" format="hex" />
                </button>
            </div>

            <div class="pb-3">
                <!-- <span class="bold">Seats</span><br> -->
                <button type="button" class="btn small p-1 bg-lightgray bold" @click="isAddSeat = true">Add Seat</button>
            </div>
        </div>
        <div>
        </div>
        <Dialog v-model:visible="isAddSeat" modal header="Add Seats">
            <form class="text-center" @submit.prevent="addSeat">
                <div class="d-flex">
                    <div class="text-start">
                        <label>Rows</label><br>
                        <input class="bg-whitesmoke border-0 p-2 mt-1" v-model="seat.row" placeholder="">
                    </div>
                    <div class="mt-3 mx-3">
                        <div class="fs-1 ">-</div>
                    </div>
                    <div class="text-start">
                        <label>Columns</label><br>
                        <input class="bg-whitesmoke border-0 p-2 mt-1" v-model="seat.column" placeholder="">
                    </div>
                </div>
                <button class="mt-3 border-0 p-2 bg-primary rounded-7 text-white">
                    Add seat
                </button>
            </form>
        </Dialog>
    </div>
</template>

<script setup>
import Dialog from "primevue/dialog"
import ColorPicker from "primevue/colorpicker"

</script>


<script>
// import Konva from 'vue-konva';

export default {
    name: "VenueBuiler",
    props: ['class', 'style'],
    components: {
    },
    data() {
        return {
            stageConfig: { width: 800, height: 300, isDragging: false, attrs: { fill: 'blue' } },
            shapes: [],
            seats: [],
            seatGroups: [],
            selectedShapeName: "",
            selectedShape: {
                attrs: {}
            },
            color: "",
            isAddSeat: false,
            seat: {},
            text: {}
        };
    },
    methods: {
        saveStage(e) {
            console.log(e)
        },
        addText() {
            const name = 'shape' + this.shapes.length
            this.shapes.push({
                type: 'v-text',
                attrs: {
                    x: 200 + Math.random() * (1 - 100) + 1,
                    y: 100 + Math.random() * (1 - 100) + 1,
                    radius: 50,
                    fill: '#555555',
                    draggable: true,
                    name,
                    text: "Enter text",
                    editable: true
                },
            });
        },
        addCircle() {
            const name = 'shape' + this.shapes.length
            this.shapes.push({
                type: 'v-circle',
                attrs: {
                    x: 200 + Math.random() * (1 - 100) + 1,
                    y: 100 + Math.random() * (1 - 100) + 1,
                    radius: 50,
                    fill: '#555555',
                    draggable: true,
                    name
                },
            });
        },
        addSquare() {
            const name = 'shape' + this.shapes.length
            // console.log(name)
            this.shapes.push({
                type: 'v-rect',
                attrs: {
                    x: 200 + Math.random() * (1 - 100) + 1,
                    y: 100 + Math.random() * (1 - 100) + 1,
                    width: 80,
                    height: 80,
                    fill: '#555555',
                    draggable: true,
                    name
                },
            });
        },
        addDoughnut() {
            // Add your doughnut creation logic here
        },
        addPolygon() {
            // Add your polygon creation logic here
        },
        addTriangle() {
            // Add your triangle creation logic here
        },
        addSeat() {
            this.isAddSeat = false
            const numRows = this.seat.row;
            const numCols = this.seat.column;
            const seatWidth = 20;
            const seatHeight = 20;
            const groupWidth = seatWidth * numRows;
            const groupHeight = seatHeight * numCols;

            const seats = [];
            for (let row = 0; row < numCols; row++) {
                for (let col = 0; col < numRows; col++) {
                    seats.push({
                        x: seatWidth * col,
                        y: seatHeight * row,
                    });
                }
            }

            this.shapes.push({
                type: 'v-group',
                seats,
                attrs: { x: 400, y: 100, width: groupWidth, height: groupHeight, draggable: true, name: "seatGroup" + this.shapes.length, fill: '#676767' }
            });
        },
        handleDragEnd(e) {
            const shape = this.getSelectedShape()
            // update the state
            this.updateShape(shape, e)
            this.stageConfig.isDragging = false
        },
        getSelectedShape() {
            let shape = null

            if (this.selectedShapeName.split("-")?.[1]?.includes("seatGroup")) {
                this.selectedShapeName = this.selectedShapeName.split("-")[1]
                console.log("It is a seat", this.selectedShapeName)
            }

            shape = this.shapes.find(
                (r, index) => r.attrs.name === this.selectedShapeName
            );
            console.log(shape)
            return shape
        },
        handleTransformEnd(e) {
            // shape is transformed, let us save new attrs back to the node
            // find element in our state
            let index
            const shape = this.getSelectedShape()

            console.log("Shape After end Transform", e)
            this.updateShape(shape, e)
        },
        handleStageMouseDown(e) {
            // clicked on stage - clear selection
            if (e.target === e.target.getStage()) {
                this.selectedShapeName = '';
                this.updateTransformer();
                return;
            }

            // clicked on transformer - do nothing
            const clickedOnTransformer = e.target.getParent().className === 'Transformer';
            if (clickedOnTransformer) {
                return;
            }

            const name = e.target.name();
            this.selectedShapeName = name

            // console.log("Shape is Clicked", [shape, name])
            // const shape = this.shapes.find((r) => r.attrs.name === name);
            // if (shape) {
            //     this.selectedShapeName = name;
            // } else {
            //     this.selectedShapeName = '';
            // }

            this.getSelectedShape()
            this.updateTransformer();
        },
        updateTransformer() {
            // here we need to manually attach or detach Transformer node
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            const { selectedShapeName } = this;

            const selectedNode = stage.findOne('.' + selectedShapeName);
            // do nothing if selected node is already attached
            if (selectedNode === transformerNode.node()) {
                return;
            }

            if (selectedNode) {
                // attach to another node
                transformerNode.nodes([selectedNode]);
            } else {
                // remove transformer
                transformerNode.nodes([]);
            }
        },
        moveUp() {
            if (!this.selectedShapeName)
                return

            const shapeIndex = this.shapes.findIndex((r, index) => r.attrs.name === this.selectedShapeName);
            if (!this.shapes?.[shapeIndex + 1])
                return

            let temp = this.shapes.splice(shapeIndex, 1, this.shapes[shapeIndex + 1])[0]
            this.shapes[shapeIndex + 1] = temp
            this.changeTransformer('')
            // this.changeTransformer(temp.attrs.name)
            // this.changeTransformer()
        },
        moveDown() {
            if (!this.selectedShapeName)
                return

            const shapeIndex = this.shapes.findIndex((r, index) => r.attrs.name === this.selectedShapeName);
            if (!this.shapes?.[shapeIndex - 1])
                return


            let temp = this.shapes.splice(shapeIndex, 1, this.shapes[shapeIndex - 1])[0]
            this.shapes[shapeIndex - 1] = temp
            this.changeTransformer('')
            // this.changeTransformer(temp.attrs.name)
        },
        updateShape(rect, e) {
            rect.attrs.x = e.target.x();
            rect.attrs.y = e.target.y();
            rect.attrs.rotation = e.target.rotation();
            rect.attrs.scaleX = e.target.scaleX();
            rect.attrs.scaleY = e.target.scaleY();

            return rect
        },
        changeTransformer(name = '') {
            this.selectedShapeName = name
            this.updateTransformer()
        },
        changeColour(e) {
            this.selectedShape.attrs.fill = '#' + e.value
            console.log(e)

        }
    },
    watch: {
        shapes: {
            immediate: true,
            deep: true,
            handler(c) {
                console.log("Shape Vef", c)
            }
        },
        seatGroups: {
            immediate: true,
            deep: true,
            handler(c) {
                console.log("Shape Vef", c)
            }
        },
        selectedShapeName(val) {
            this.selectedShape = this.getSelectedShape()
            this.color = this.selectedShape?.attrs?.fill.replace("#", "")
        }
    }
};
</script>
  
<style scoped>
canvas {
    background-color: red !important;
}

/* Add your custom styles here */
</style>

