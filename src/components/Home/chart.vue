<template>
	<chart :options="polar"></chart>
</template>
<script>
	export default {
		data() {
			return {
				polar: ''
			}
		},
		created() {
			var data = {
				"asks": [
					[
						"32.831",
						"0.083"
					],
					[
						"10.831",
						"1.083"
					],
					[
						"8.831",
						"2.083"
					],
					[
						"7.831",
						"3.083"
					],
					[
						"6.831",
						"4.083"
					],
				],
				"bids": [
					[
						"30.434",
						"10.766"
					],
					[
						"30.434",
						"9.766"
					],
					[
						"30.434",
						"8.766"
					],
					[
						"7.434",
						"6.766"
					],
				],
			}
			this.polar = {
				tooltip: {
					trigger: 'axis',
					backgroundColor: '#F7F7F7',
					textStyle: {

						color: '#000'
					},
					borderWidth: '2',
					borderColor: 'rgba(0,0,0,.4)'
					//				position: function(pt) {
					//					return [pt[0], '10%'];
					//				}
				},
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'value',
					boundaryGap: false,
					splitLine: {
						show: false
					}
				},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					axisLine: {
						show: false
					},
					axisLabel: {
						show: false
					}
				},
				series: [{
					name: '买单',
					type: 'line',
					smooth: true,
					showSymbol: false,
					sampling: 'average',
					itemStyle: {
						normal: {
							color: '#E65855'
						}
					},
					lineStyle: {
						color: '#E65855',
						width: 3
					},
					areaStyle: {},
					data: data.asks.map(function(e) {
						return [e[1], e[0]]
					})
				}, {
					name: '实收',
					type: 'line',
					smooth: true,
					showSymbol: false,
					sampling: 'average',
					itemStyle: {
						normal: {
							color: '#64D694'
						},

					},
					lineStyle: {
						color: '#64D694',
						width: 3
					},
					//				symbolSize: 12,
					//				symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
					//				markPoint: {
					//					label: {
					//						normal: {
					//							fontSize: 16
					//						}
					//					},
					//					itemStyle: {
					//						normal: {
					//							color: '#ccc',
					//						}
					//					}
					//				},
					areaStyle: {},
					data: data.bids.map(function(e) {
						return [e[1], e[0]]
					})
				}]
			};
		}
	}

</script>

<style>
	.echarts {
		width: 100%;
		height: 100%;
	}

</style>
