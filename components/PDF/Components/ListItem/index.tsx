import { Text, View, StyleSheet } from "@react-pdf/renderer";

export interface ListItemProps {
    children: React.ReactNode
}

const ListItem = ({children}: ListItemProps) => {
    const styles = StyleSheet.create({
        row: {
            display: "flex",
            flexDirection: "row",
        },
        bullet: {
            height: "100%",
            width: "5%",
        },
    });

    return (
        <View style={styles.row}>
            <View style={styles.bullet}>
                <Text>{"\u2022"}</Text>
            </View>
            <Text>{children}</Text>
        </View>
    );
};

export default ListItem;
