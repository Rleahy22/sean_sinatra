angular.module('datagility', [])
    .controller('datagilityCtrl', ['$scope', function($scope) {
        $scope.loaded = true;

        $scope.inputs = {
            sales: undefined,
            mfgAverageOrder: undefined,
            custAverageOrder: undefined,
            grossMargin: undefined,
            estimatedSalesInc: undefined,
            mfgOrderErrors: undefined,
            custOrderErrors: undefined,
            mfgErrorCost: undefined,
            custErrorCost: undefined,
            mfgErrorSavings: undefined,
            custErrorSavings: undefined,
            desiredRoi: undefined
        };

        $scope.outputs = {
            salesProjection: undefined,
            gmIncrease: undefined,
            mfgErrorsAfter: undefined,
            mfgCostErrorsAfter: undefined,
            custErrorsAfter: undefined,
            custCostErrorsAfter: undefined,
            mfgSavings: undefined,
            custSavings: undefined,
            totalSavings: undefined,
            totalBenefit: undefined,
            feeCalculated: undefined,
            payback: undefined,
            roiAfter: undefined,
            paybackAfter: undefined
        };

        $scope.updateOutputs = function() {
            $scope.outputs.salesProjection = $scope.inputs.sales * ($scope.inputs.estimatedSalesInc / 100);

            $scope.outputs.gmIncrease = $scope.outputs.salesProjection / (1 - ($scope.inputs.grossMargin / 100)) - $scope.outputs.salesProjection;

            $scope.outputs.mfgErrorsAfter = $scope.inputs.sales / $scope.inputs.mfgAverageOrder * ($scope.inputs.mfgOrderErrors / 100);

            $scope.outputs.mfgCostErrorsAfter = $scope.outputs.mfgErrorsAfter * $scope.inputs.mfgErrorCost;

            $scope.outputs.custErrorsAfter = $scope.inputs.sales / $scope.inputs.custAverageOrder * ($scope.inputs.custOrderErrors / 100);

            $scope.outputs.custCostErrorsAfter = $scope.outputs.custErrorsAfter * $scope.inputs.custErrorCost;

            $scope.outputs.mfgSavings = $scope.outputs.mfgCostErrorsAfter * ($scope.inputs.mfgErrorSavings / 100);

            $scope.outputs.custSavings = $scope.outputs.custCostErrorsAfter * ($scope.inputs.custErrorSavings / 100);

            $scope.outputs.totalSavings = $scope.outputs.mfgSavings + $scope.outputs.custSavings;

            $scope.outputs.totalBenefit = $scope.outputs.gmIncrease + $scope.outputs.totalSavings;

            $scope.outputs.feeCalculated = $scope.outputs.totalBenefit / (($scope.inputs.desiredRoi / 100) * 1 + 1);

            $scope.outputs.payback = $scope.outputs.feeCalculated / $scope.outputs.totalBenefit;

            $scope.outputs.fee = 1000000;

            $scope.outputs.roiAfter = (($scope.outputs.totalBenefit / $scope.outputs.fee) - 1) * 100;

            $scope.outputs.paybackAfter = $scope.outputs.fee / $scope.outputs.totalBenefit;
        };

        $scope.$watch('inputs', function() {
            $scope.updateOutputs();
        }, true);
    }]);