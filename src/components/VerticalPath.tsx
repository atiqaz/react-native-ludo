import { StyleSheet, View } from 'react-native'
import React, { memo, useMemo } from 'react'
import Cell from './Cell';

function VerticalPath({ color, cells }: any) {
    const groupedCells = useMemo(() => {
        const groups = [];
        for (let i = 0; i < cells.length; i += 3) {
            groups.push(cells.slice(i, i + 3));
        }
        return groups;
    }, [cells])

    return (
        <View style={{ flexDirection: "column", flex: 3, height: "100%" }}>
            {groupedCells.map((group, groupIndex) => (
                <View key={`group-${groupIndex}`} style={{ flexDirection: "row", flex: 1, width: "100%" }}>
                    {group.map((id: any) => (
                        <View key={`cell-${id}`} style={{ flex: 1, height: "100%" }}>
                            <Cell cell={true} color={color} id={id} />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    )
}
export default memo(VerticalPath)

const styles = StyleSheet.create({})
