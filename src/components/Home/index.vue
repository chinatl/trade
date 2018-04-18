<template>
<div class="section" v-loading='loading'>
	<div id="app-sider" class="trading-slider">
		<div class="trading-filter">
			<div class="search"><i class="trading-icon trading-icon-search"></i> <input placeholder="搜索" type="text"></div>
			<div class="drop">
				<p>价格显示:<span>USD</span></p>
				<ul class="drop-box">
					<li class="active">USD</li>
					<li class="">CNY</li>
				</ul>
			</div>
		</div>
		<div class="trading-market">
			<div class="trading-tab">
				<ul>
					<!---->
					<li role="button" :class=" current == index ? 'active' : ''" v-for='(item,index) in father_market'>
						<img :src="item.markUrl">
						<p>{{item.vName}}</p>
					</li>
				</ul>
			</div>
			<div class="market-list">
				<div class=""></div>
					<el-table 
				:data="son_market" 
			 	fit highlight-current-row
			 	class='market'
			   :default-sort = "{prop: 'newprice', order: 'descending'}"
				style="width: 100%;margin-top:20px">
					<el-table-column align="center" label="市场" prop='market' sortable>
						<template slot-scope="scope" >
						<span>{{scope.row.market}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="最新价" sortable prop='newprice'>
	<template slot-scope="scope">
						<span>{{scope.row.newprice}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="涨跌幅" sortable>
	<template slot-scope="scope">
						<span>{{scope.row.num}}</span>
						</template>
</el-table-column>
</el-table>
</div>
</div>
</div>
<div id="app-trade-pro" class="trading-content">
	<div class="trading-count">
		<div class="l-area">
			<div class="current-price">
				<div class="coin-icon"><img src="/src/images/icon/market-icon/market-qtum.png"></div>
				<h2>QTUM/BTC <span class="text-second trading-greencolor">0.001927</span></h2>
				<p>≈ 15.309 USD</p>
			</div>
			<div class="num">24H涨跌幅<br><span class="text-second trading-greencolor">-8.62%</span></div>
			<div class="num">24H最高价<br><span aria-label="折合:16.977 USD" class="trading-redcolor hint--bottom">0.002137</span></div>
			<div class="num">24H最低价<br><span aria-label="折合:15.309 USD" class="trading-greencolor hint--bottom">0.001927</span></div>
			<div class="num">24H交易量<br><span class="trading-darkcolor">38344.99 QTUM</span></div>
		</div>
		<div class="r-area"><a role="button" onclick="$('.trading-chart').toggle()" style="margin-right: 15px;">收起/展开K线</a></div>
	</div>
	<div class="trading-chart">
		<!---->
		<div class="chart-area">
			<div class="common-box chart-box">
				<div class="chart-box-head">
					<div class="l-area">
						<div class="item">
							<p :class="current ? 'active' : ''" @click='current = true'>K线图</p>
						</div>
						<div class="item">
							<p :class="!current ? 'active' : ''" @click='current = false'>深度图</p>
						</div>
						<div class="line"></div>
						<div class="item">
							<p aria-label="K线价格显示单位设置" class="hint--bottom">BTC</p>
						</div>
						<div class="item">
							<p aria-label="K线价格显示单位设置" class="hint--bottom active">USD</p>
						</div>
					</div>
					<div class="r-area">
						<div class="item arrow">
							<p>价格显示：<span>USD</span></p>
							<ul class="item-list">
								<li role="button">默认</li>
								<li role="button" class="active">USD</li>
								<li role="button">CNY</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="chart-box-body" v-show='!current'>
					<chart :options="polar" :style='{width:width+"px"}'></chart>
				</div>
				<div class="chart-box-body" id="chart-box-body" v-show='current'>
					<!---->
				</div>
			</div>
		</div>
	</div>
	<div class="trading-hotspot">
		<div class="trading-form">
			<div class="form-tab">
				<ul>
					<li class="active">限价委托</li>
					<li class="">批量委托</li>
					<!---->
				</ul>
				<div class="operation"><a role="button" class="switch">价格输入转换<i></i></a>
					<!---->
				</div>
			</div>
			<div class="form-lever-panel">
				<!---->
				<!---->
			</div>
			<div class="form-content">
				<div class="box trading-buy">
					<h2>买入QTUM</h2>
					<p class="form-assets">
						可用BTC：<span aria-label="可买：-- QTUM" class="trading-redcolor hint--top">--</span>
						<!---->
						<!---->
					</p>
					<!---->
					<!---->
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="buyColor"> <label>买入价BTC</label>
							<!----><span>≈<b class="sellColor">14.981</b> USD</span></div>
					</div>
					<!---->
					<div class="form-group active">
						<div class="form-control"><input type="text" class="sellColor"> <label>买入量QTUM</label></div>
						<div class="bk-trans-form">
							<div id="rangeSlider_1" class="range range_buy"><span class="sliderPercent">0.00%</span>
								<div class="range_wrap" data-ratio="0" tabindex="0">
									<div class="range_paths_wrap">
										<div class="range_path"></div>
									</div>
									<div class="range_track_wrap">
										<div class="range_track" style="width: 0%;"></div>
										<div class="range_handle" style="left: 0%;"></div>
									</div>
									<div class="range_points_wrap">
										<div class="range_point active" data-point-ratio="0" style="left: 0%;"></div>
										<div class="range_point" data-point-ratio="20" style="left: 20%;"></div>
										<div class="range_point" data-point-ratio="40" style="left: 40%;"></div>
										<div class="range_point" data-point-ratio="60" style="left: 60%;"></div>
										<div class="range_point" data-point-ratio="80" style="left: 80%;"></div>
										<div class="range_point" data-point-ratio="100" style="left: 100%;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p class="form-assets">预计交易额：<span class="trading-redcolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> BTC</p>
					<!---->
					<div class="form-button"><button type="button" role="button" class="trading-redbg disabled">登录/注册</button></div>
				</div>
				<div class="box trading-sell">
					<h2>卖出QTUM</h2>
					<p class="form-assets">
						可用QTUM：<span aria-label="可卖：-- BTC" class="trading-greencolor hint--top">--</span>
						<!---->
						<!---->
					</p>
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="sellColor"> <label>卖出价BTC</label>
							<!----><span>≈<b class="sellColor">14.981</b> USD</span></div>
					</div>
					<!---->
					<!---->
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="sellColor"> <label>卖出量QTUM</label></div>
						<div class="bk-trans-form">
							<div id="rangeSlider_0" class="range range_sell"><span class="sliderPercent">0.00%</span>
								<div class="range_wrap" data-ratio="0" tabindex="0">
									<div class="range_paths_wrap">
										<div class="range_path"></div>
									</div>
									<div class="range_track_wrap">
										<div class="range_track"></div>
										<div class="range_handle"></div>
									</div>
									<div class="range_points_wrap">
										<div class="range_point" data-point-ratio="0" style="left: 0%;"></div>
										<div class="range_point" data-point-ratio="20" style="left: 20%;"></div>
										<div class="range_point" data-point-ratio="40" style="left: 40%;"></div>
										<div class="range_point" data-point-ratio="60" style="left: 60%;"></div>
										<div class="range_point" data-point-ratio="80" style="left: 80%;"></div>
										<div class="range_point" data-point-ratio="100" style="left: 100%;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p class="form-assets">预计交易额：<span class="trading-greencolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> BTC</p>
					<!---->
					<div class="form-button"><button type="button" role="button" class="trading-greenbg disabled">登录/注册</button></div>
				</div>
			</div>
		</div>
		<div class="trading-disc" assist-price="[object Object]">
			<div class="disc-head">
				<p class="stall"><span>档位</span></p>
				<p><span>价格(BTC)</span></p>
				<p><span>折价(USD)</span></p>
				<p class="last"><span>数量(QTUM)</span></p>
			</div>
			<div class="disc-list">
				<div id="asksDish" class="sell-disc disc-inner" style="touch-action: none;">
					<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 500ms; <!--transform: translate(0px, -952px) translateZ(0px);-->">
						<li role="button">
							<p class="stall trading-greencolor">卖9</p>
							<p class="trading-greencolor">0.001981</p>
							<p>15.738</p>
							<p class="last">10.25</p>
							<p class="progress" style="width: 0.92%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖8</p>
							<p class="trading-greencolor">0.001975</p>
							<p>15.690</p>
							<p class="last">1.96</p>
							<p class="progress" style="width: 0.17%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖7</p>
							<p class="trading-greencolor">0.001971</p>
							<p>15.658</p>
							<p class="last">1.70</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖6</p>
							<p class="trading-greencolor">0.001966</p>
							<p>15.618</p>
							<p class="last">12.20</p>
							<p class="progress" style="width: 1.09%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖5</p>
							<p class="trading-greencolor">0.001950</p>
							<p>15.491</p>
							<p class="last">1.82</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖4</p>
							<p class="trading-greencolor">0.001949</p>
							<p>15.483</p>
							<p class="last">0.51</p>
							<p class="progress" style="width: 0.04%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖3</p>
							<p class="trading-greencolor">0.001947</p>
							<p>15.467</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 100%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖2</p>
							<p class="trading-greencolor">0.001945</p>
							<p>15.452</p>
							<p class="last">9.90</p>
							<p class="progress" style="width: 0.88%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖1</p>
							<p class="trading-greencolor">0.001929</p>
							<p>15.324</p>
							<p class="last">150.69</p>
							<p class="progress" style="width: 13.53%;"></p>
						</li>
					</ul>
					<div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
						<div class="iScrollIndicator" style="transition-duration: 500ms; display: block; height: 19px; transform: translate(0px, 125px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
					</div>
				</div>
			</div>
			<div class="disc-line"></div>
			<div class="disc-price">
				<div class="price">
					<h3><span class="text-second trading-greencolor">0.001927 <b style="font-size: 12px; vertical-align: middle;">BTC</b></span></h3>
					≈ 15.309 USD
				</div>
				<div class="control">
					<a role="button"><img src="/src/images/icon/show_bids.jpg"></a>
					<a role="button"><img src="/src/images/icon/show_asks.jpg"></a>
				</div>
			</div>
			<div class="disc-line"></div>
			<div class="disc-list">
				<div id="bidsDish" class="buy-disc disc-inner" style="touch-action: none;">
					<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
						<li role="button">
							<p class="stall trading-redcolor">买1</p>
							<p class="trading-redcolor">0.001900</p>
							<p>15.094</p>
							<p class="last">30.00</p>
							<p class="progress" style="width: 0.8%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买2</p>
							<p class="trading-redcolor">0.001899</p>
							<p>15.086</p>
							<p class="last">2.80</p>
							<p class="progress" style="width: 0.07%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买3</p>
							<p class="trading-redcolor">0.001898</p>
							<p>15.078</p>
							<p class="last">9.30</p>
							<p class="progress" style="width: 0.24%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买4</p>
							<p class="trading-redcolor">0.001893</p>
							<p>15.038</p>
							<p class="last">0.14</p>
							<p class="progress" style="width: 0%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买5</p>
							<p class="trading-redcolor">0.001886</p>
							<p>14.983</p>
							<p class="last">8.70</p>
							<p class="progress" style="width: 0.23%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买6</p>
							<p class="trading-redcolor">0.001884</p>
							<p>14.967</p>
							<p class="last">10.30</p>
							<p class="progress" style="width: 0.27%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买7</p>
							<p class="trading-redcolor">0.001868</p>
							<p>14.840</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 29.83%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买8</p>
							<p class="trading-redcolor">0.001867</p>
							<p>14.832</p>
							<p class="last">14.00</p>
							<p class="progress" style="width: 0.37%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买9</p>
							<p class="trading-redcolor">0.001866</p>
							<p>14.824</p>
							<p class="last">10.80</p>
							<p class="progress" style="width: 0.28%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买10</p>
							<p class="trading-redcolor">0.001865</p>
							<p>14.816</p>
							<p class="last">14.40</p>
							<p class="progress" style="width: 0.38%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买11</p>
							<p class="trading-redcolor">0.001863</p>
							<p>14.800</p>
							<p class="last">1.32</p>
							<p class="progress" style="width: 0.03%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买12</p>
							<p class="trading-redcolor">0.001861</p>
							<p>14.784</p>
							<p class="last">2.06</p>
							<p class="progress" style="width: 0.05%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买13</p>
							<p class="trading-redcolor">0.001859</p>
							<p>14.768</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 29.83%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买14</p>
							<p class="trading-redcolor">0.001845</p>
							<p>14.657</p>
							<p class="last">12.50</p>
							<p class="progress" style="width: 0.33%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买15</p>
							<p class="trading-redcolor">0.001842</p>
							<p>14.633</p>
							<p class="last">13.80</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买16</p>
							<p class="trading-redcolor">0.001837</p>
							<p>14.594</p>
							<p class="last">11.30</p>
							<p class="progress" style="width: 0.3%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买17</p>
							<p class="trading-redcolor">0.001834</p>
							<p>14.570</p>
							<p class="last">8.40</p>
							<p class="progress" style="width: 0.22%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买18</p>
							<p class="trading-redcolor">0.001823</p>
							<p>14.482</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买19</p>
							<p class="trading-redcolor">0.001806</p>
							<p>14.347</p>
							<p class="last">13.50</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买20</p>
							<p class="trading-redcolor">0.001724</p>
							<p>13.696</p>
							<p class="last">13.10</p>
							<p class="progress" style="width: 0.35%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买21</p>
							<p class="trading-redcolor">0.001707</p>
							<p>13.561</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买22</p>
							<p class="trading-redcolor">0.001653</p>
							<p>13.132</p>
							<p class="last">13.61</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买23</p>
							<p class="trading-redcolor">0.001600</p>
							<p>12.711</p>
							<p class="last">3.08</p>
							<p class="progress" style="width: 0.08%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买24</p>
							<p class="trading-redcolor">0.001573</p>
							<p>12.496</p>
							<p class="last">13.30</p>
							<p class="progress" style="width: 0.35%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买25</p>
							<p class="trading-redcolor">0.001557</p>
							<p>12.369</p>
							<p class="last">5.10</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买26</p>
							<p class="trading-redcolor">0.001552</p>
							<p>12.329</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买27</p>
							<p class="trading-redcolor">0.001538</p>
							<p>12.218</p>
							<p class="last">18.31</p>
							<p class="progress" style="width: 0.49%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买28</p>
							<p class="trading-redcolor">0.001532</p>
							<p>12.170</p>
							<p class="last">25.73</p>
							<p class="progress" style="width: 0.68%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买29</p>
							<p class="trading-redcolor">0.001530</p>
							<p>12.155</p>
							<p class="last">15.07</p>
							<p class="progress" style="width: 0.4%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买30</p>
							<p class="trading-redcolor">0.001493</p>
							<p>11.861</p>
							<p class="last">6.80</p>
							<p class="progress" style="width: 0.18%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买31</p>
							<p class="trading-redcolor">0.001474</p>
							<p>11.710</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买32</p>
							<p class="trading-redcolor">0.001452</p>
							<p>11.535</p>
							<p class="last">17.20</p>
							<p class="progress" style="width: 0.46%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买33</p>
							<p class="trading-redcolor">0.001445</p>
							<p>11.479</p>
							<p class="last">5.20</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买34</p>
							<p class="trading-redcolor">0.001425</p>
							<p>11.320</p>
							<p class="last">5.00</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买35</p>
							<p class="trading-redcolor">0.001276</p>
							<p>10.137</p>
							<p class="last">1.50</p>
							<p class="progress" style="width: 0.04%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买36</p>
							<p class="trading-redcolor">0.001271</p>
							<p>10.097</p>
							<p class="last">0.41</p>
							<p class="progress" style="width: 0.01%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买37</p>
							<p class="trading-redcolor">0.001267</p>
							<p>10.065</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买38</p>
							<p class="trading-redcolor">0.001266</p>
							<p>10.057</p>
							<p class="last">6.30</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买39</p>
							<p class="trading-redcolor">0.001264</p>
							<p>10.041</p>
							<p class="last">0.70</p>
							<p class="progress" style="width: 0.01%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买40</p>
							<p class="trading-redcolor">0.001073</p>
							<p>8.524</p>
							<p class="last">1.00</p>
							<p class="progress" style="width: 0.02%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买41</p>
							<p class="trading-redcolor">0.000970</p>
							<p>7.706</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买42</p>
							<p class="trading-redcolor">0.000550</p>
							<p>4.369</p>
							<p class="last">1.01</p>
							<p class="progress" style="width: 0.02%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买43</p>
							<p class="trading-redcolor">0.000421</p>
							<p>3.344</p>
							<p class="last">92.43</p>
							<p class="progress" style="width: 2.47%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买44</p>
							<p class="trading-redcolor">0.000194</p>
							<p>1.541</p>
							<p class="last">5.20</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买45</p>
							<p class="trading-redcolor">0.000191</p>
							<p>1.517</p>
							<p class="last">613.05</p>
							<p class="progress" style="width: 16.43%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买46</p>
							<p class="trading-redcolor">0.000063</p>
							<p>0.500</p>
							<p class="last">200.00</p>
							<p class="progress" style="width: 5.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买47</p>
							<p class="trading-redcolor">0.000002</p>
							<p>0.015</p>
							<p class="last">364.56</p>
							<p class="progress" style="width: 9.77%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买48</p>
							<p class="trading-redcolor">0.000001</p>
							<p>0.007</p>
							<p class="last">3730.00</p>
							<p class="progress" style="width: 100%;"></p>
						</li>
					</ul>
					<div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
						<div class="iScrollIndicator" style="transition-duration: 0ms; display: block; height: 20px; transform: translate(0px, 0px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="trading-record">
		<div class="entrust-record">
			<div class="current-entrust">
				<div class="entrust-head">
					<h3>正在进行的委托</h3>
					<!---->
				</div>
				<div class="record-list">
					<ul>
						<li class="head">
							<div class="item time">
								<p>时间</p>
							</div>
							<div class="item">
								<p><span>委托价</span>成交均价(BTC)</p>
							</div>
							<div class="item">
								<p><span>委托量</span>成交量(QTUM)</p>
							</div>
							<div class="item">
								<p><span>成交额</span>(BTC)</p>
							</div>
							<div class="item last">
								<p>操作</p>
							</div>
						</li>
						<!---->
						<li>
							<div class="bk-norecord" style="width:100%;padding:10px;text-align:center">
								<p><i class="bk-ico info"></i>您还没有登录，请 <a href="/login" style="color: rgb(222, 33, 29); margin: 0px 5px;">登录</a> 或 <a href="/register" style="color: rgb(61, 193, 142); margin: 0px 5px;">注册</a> 后再尝试。</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="current-entrust">
				<div class="entrust-head">
					<h3>历史委托</h3>
					<!---->
				</div>
				<div class="record-list">
					<ul>
						<li class="head">
							<div class="item time">
								<p>时间</p>
							</div>
							<div class="item">
								<p><span>委托价</span>成交均价(BTC)</p>
							</div>
							<div class="item">
								<p><span>委托量</span>成交量(QTUM)</p>
							</div>
							<div class="item">
								<p><span>成交额</span>(BTC)</p>
							</div>
							<div class="item last">
								<p>操作</p>
							</div>
						</li>
						<!---->
						<li>
							<div class="bk-norecord" style="width:100%;padding:10px;text-align:center">
								<p><i class="bk-ico info"></i>您还没有登录，请 <a href="/login" style="color: rgb(222, 33, 29); margin: 0px 5px;">登录</a> 或 <a href="/register" style="color: rgb(61, 193, 142); margin: 0px 5px;">注册</a> 后再尝试。</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="newest-record">
			<div class="newest-top">
				<h3>最新成交</h3>
			</div>
			<div class="newest-head">
				<el-table :data="new_trade" fit highlight-current-row style="width: 100%;margin-top:20px">
					<el-table-column align="center" label="成交时间" width='100'>
						<template slot-scope="scope">
							<span>{{scope.row.date}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="成交价(BTC)">
						<template slot-scope="scope">
							<span>{{scope.row.BTC}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="折扣(USD)">
						<template slot-scope="scope">
							<span>{{scope.row.USD}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="交易量(QTUM)">
						<template slot-scope="scope">
							<span>{{scope.row.QTUM}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
	<!---->
	<!---->
	<!---->
</div>
</div>
</template>
<script>
	import Get from '@/api/get'
	import Post from '@/api/post'
	export default {
		name: 'transaction',
		data() {
			return {
				current:0,
				loading: false,
				width: null,
				current: true,
				polar: {},
				new_trade: [{
					date: '2017-08-12',
					BTC: '0.001927',
					USD: '0.1927',
					QTUM: '0.1927',
				}, {
					date: '2017-08-12',
					BTC: '0.001927',
					USD: '0.1927',
					QTUM: '0.1927',
				}, {
					date: '2017-08-12',
					BTC: '0.001927',
					USD: '0.1927',
					QTUM: '01927',
				}, {
					date: '2017-08-12',
					BTC: '0.001927',
					USD: '0.1927',
					QTUM: '0.1927',
				}],
				father_market: [],
				son_market: [],
				
				son_ket: {
					id: '',
					name: '',
				},
				fa_ket: {
					bId: '',
					vName: ''
				}
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
				grid: {
					left: '2%',
					right: '2%',
					bottom: '2%',
					top: '2%',
					containLabel: true
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
			this.width = screen.availWidth - 350 - 20;
			Get({
				url: 'basisMarket/selBasisMarket',
				success: res => {
					console.log(res);
					if (res.code === 0) {
						this.father_market = res.data;
						this.fa_ket = res.data[0];
						this.selcurrencyManage(this.fa_ket);
					}
				}
			})

		},
		methods: {
			/*查询子市场*/
			selcurrencyManage(obj) {
				Get({
					url: 'basisMarket/selcurrencyManage',
					data: {
						bId: obj.bId,
						vName: obj.vName,
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.son_market = res.data;
							this.son_ket = res.data[0];
						}
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
			/*查询余额*/
			selAmount() {
				Get({
					url: 'pool/selAmount',
					data: {
						currId: this.son_ket.id
					},
					success: res => {
						this.loading = false;
						console.log(res);
						if (res.code === 0) {}
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
			/*新增稳妥*/
			selAmount() {
				Post({
					url: 'pool/addPool',
					data: {
						tradeMarket: "",
						entrustType: '',
						prize: "",
						amount: ''
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {}
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
			/*币种交易数量小数位限制*/
			selCurrencyDP() {
				Get({
					url: 'pool/addPool',
					data: {
						currId: this.son_ket.id
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {}
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
			/*价格交易限制*/
			/*历史订单*/
			selPool() {
				this.loading = true;
				Get({
					url: 'pool/selPool',
					data: {
						id: '',
						entrustType: '',
						averagePrize: '',
						leftAmount: '',
						leftCount: '',
					},
					success: res => {
						this.loading = false;
						console.log(res);
						if (res.code === 0) {}
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
			init(bId, vName) {
				this.loading = true;
				Get({
					url: 'basisMarket/selBasisMarket',
					data: {
						bId: bId,
						vName: vName
					},
					success: res => {
						this.loading = false;
						console.log(res);
						if (res.code === 0) {}
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
			findprize(tradeMarket) {
				Get({
					url: 'basisMarket/findprize',
					data: {
						tradeMarket: tradeMarket
					},
					success: res => {
						this.loading = false;
						console.log(res);
						if (res.code === 0) {}
					},
					fail: res => {
						this.loading = false;
					}
				})
			}
		},
		mounted() {
			var kline = new Kline({
				element: "#chart-box-body",
				width: $('.trading-chart').width(),
				height: 400,
				theme: 'light', // light/dark
				language: 'zh-cn', // zh-cn/en-us/zh-tw
				ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
				symbol: "BTC",
				symbolName: "BTC/USD",
				type: "poll", // poll/socket
				limit: 1000,
				intervalTime: 5000,
				showTrade: false,
				debug: false,
				url: "/static1/mock.json"
			})
			kline.draw();
		},

	}

</script>

<style>
	@import '../../assets/transaction.css';
	.section {
		display: flex;
		width: 100%;
	}
	
	.market .has-gutter {
		font-size: 12px;
		font-weight: bold
	}
	
	.market .el-table__row .cell span {
		font-size: 12px;
		white-space: nowrap;
	}
	
	.newest-head .has-gutter .el-table td,
	.newest-head .has-gutter .el-table th {
		padding: 4px;
	}
	
	.newest-head .has-gutter {
		font-size: 12px;
		font-weight: bold
	}
	
	.newest-head tbody {
		font-size: 12px;
		white-space: nowrap;
	}
	
	.el-table td,
	.el-table th {
		padding: 4px 0;
	}
	
	.el-table td span,
	.el-table th span {
		white-space: nowrap;
	}
	
	.el-table--scrollable-x .el-table__body-wrapper {
		overflow-x: hidden;
	}
	
	.echarts {
		height: 422px;
	}

</style>
