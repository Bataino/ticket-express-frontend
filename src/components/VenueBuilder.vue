
<template>
    <div :class="class" :style="style" class="w-100">
        <div>
            <v-stage :config="stageConfig" @mousedown="handleStageMouseDown">
                <v-layer ref="layer">
                    <!-- Render shapes -->
                    <v-group v-for="(shape, index) in shapes" :key="index">
                        <component :is="shape.type" v-bind="shape.attrs" @transformend="handleTransformEnd" />
                    </v-group>
                    <v-transformer ref="transformer" />

                    <!-- Render seats -->
                    <v-group v-for="(seat, index) in seats" :key="index">
                        <v-rect :x="seat.x" :y="seat.y" width="20" height="20" fill="gray" draggable="true" />
                        <!-- <v-transformer :nodes="[seat.attrs]" /> -->
                    </v-group>
                </v-layer>
            </v-stage>

            <div>
                <h2>Shapes</h2>
                <button @click="addCircle">Add Circle</button>
                <button @click="addSquare">Add Square</button>
                <button @click="addDoughnut">Add Doughnut</button>
                <button @click="addPolygon">Add Polygon</button>
                <button @click="addTriangle">Add Triangle</button>
            </div>

            <div>
                <h2>Seats</h2>
                <button @click="addSeat">Add Seat</button>
            </div>
        </div>
    </div>
</template>
  
<script>
// import Konva from 'vue-konva';

export default {
    name: "VenueBuiler",
    props: ['class', 'style'],
    components: {
    },
    data() {
        return {
            stageConfig: { width: 800, height: 300 },
            shapes: [],
            seats: [],
            seatGroups: []
        };
    },
    methods: {
        addCircle() {
            this.shapes.push({
                type: 'v-circle',
                attrs: {
                    x: 100,
                    y: 100,
                    radius: 50,
                    fill: 'blue',
                    draggable: true,
                },
            });
        },
        addSquare() {
            this.shapes.push({
                type: 'v-rect',
                attrs: {
                    x: 200,
                    y: 100,
                    width: 80,
                    height: 80,
                    fill: 'green',
                    draggable: true,
                },
            });
        },
        handleTransformEnd(e) {
            // shape is transformed, let us save new attrs back to the node
            // find element in our state
            const rect = this.rectangles.find(
                (r) => r.name === this.selectedShapeName
            );
            // update the state
            rect.x = e.target.x();
            rect.y = e.target.y();
            rect.rotation = e.target.rotation();
            rect.scaleX = e.target.scaleX();
            rect.scaleY = e.target.scaleY();

            // change fill
        },
        handleStageMouseDown(e) {
            // clicked on stage - clear selection
            if (e.target === e.target.getStage()) {
                this.selectedShapeName = '';
                this.updateTransformer();
                return;
            }

            // clicked on transformer - do nothing
            const clickedOnTransformer =
                e.target.getParent().className === 'Transformer';
            if (clickedOnTransformer) {
                return;
            }

            // find clicked rect by its name
            const name = e.target.name();
            const shape = this.shapes.find((r) => r.name === name);
            if (shape) {
                this.selectedShapeName = name;
            } else {
                this.selectedShapeName = '';
            }
            var tr = new Konva.Transformer()
            this.$refs.layer.add(tr)
            tr.attachTo(e.target)
            // this.updateTransformer();
        },
        updateTransformer() {
            // here we need to manually attach or detach Transformer node
            console.log(this.$refs.transformer.getNode())
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
            const groupWidth = 120;
            const groupHeight = 80;
            const numRows = 4;
            const numCols = 6;
            const seatWidth = groupWidth / numCols;
            const seatHeight = groupHeight / numRows;

            const seats = [];
            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    seats.push({
                        x: seatWidth * col,
                        y: seatHeight * row,
                    });
                }
            }

            this.seatGroups.push({ x: 400, y: 100, width: groupWidth, height: groupHeight, seats });
        },
    },
};
</script>
  
<style>
/* Add your custom styles here */
</style>

