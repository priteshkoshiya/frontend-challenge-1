'use client';

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoFilterState, FilterType } from '../state/atoms';
import { todoStatsSelector } from '../state/selectors';
import { CheckCircle } from 'lucide-react';

export const TodoActions: React.FC = () => {
    const [filter, setFilter] = useRecoilState(todoFilterState);
    const stats = useRecoilValue(todoStatsSelector);

    const changeFilter = (newFilter: FilterType) => {
        setFilter(newFilter);
    };

    const allCompleted = stats.totalCount > 0 && stats.completedCount === stats.totalCount;

    return (
        <div className="space-y-4">
            <div className="flex flex-row justify-between sm:items-center mb-10 gap-2">
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Task List</h1>
                </div>

                {stats.totalCount > 0 && (
                    <div
                        className={`text-xs sm:text-sm px-3 py-1 rounded-full transition-all duration-300 flex items-center self-start sm:self-auto
                            ${allCompleted
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-50 text-blue-700 animate-bounce'}`}
                    >
                        {allCompleted ? (
                            <>
                                <CheckCircle size={14} className="mr-1.5" />
                                <span>All complete!</span>
                            </>
                        ) : (
                            <span>{stats.incompleteCount} remaining</span>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-3">
                <div className="inline-flex rounded-md shadow-sm w-full sm:w-auto">
                    <button
                        onClick={() => changeFilter('all')}
                        className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-l-md transition-all duration-200 flex items-center justify-center
                            ${filter === 'all'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        All
                        {stats.totalCount > 0 && (
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-white bg-opacity-20">
                                {stats.totalCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => changeFilter('active')}
                        className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-l border-r border-white transition-all duration-200 flex items-center justify-center
                            ${filter === 'active'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Active
                        {stats.incompleteCount > 0 && (
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${filter === 'active'
                                ? 'bg-white bg-opacity-20'
                                : 'bg-primary bg-opacity-10 text-primary'
                                }`}>
                                {stats.incompleteCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => changeFilter('completed')}
                        className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-r-md transition-all duration-200 flex items-center justify-center
                            ${filter === 'completed'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Done
                        {stats.completedCount > 0 && (
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${filter === 'completed'
                                ? 'bg-white bg-opacity-20'
                                : 'bg-primary bg-opacity-10 text-primary'
                                }`}>
                                {stats.completedCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};