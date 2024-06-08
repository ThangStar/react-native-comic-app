import * as SQLite from 'expo-sqlite';

export const SqliteRepositories = {
    getAll: async () => {
        const db = await SQLite.openDatabaseAsync('comic_db')
        const statement = await db.prepareAsync(
            'INSERT INTO test (value, intValue) VALUES ($value, $intValue)'
        );
        try {
            let result = await statement.executeAsync({ $value: 'bbb', $intValue: 101 });
            console.log('bbb and 101:', result.lastInsertRowId, result.changes);

            result = await statement.executeAsync({ $value: 'ccc', $intValue: 102 });
            console.log('ccc and 102:', result.lastInsertRowId, result.changes);

            result = await statement.executeAsync({ $value: 'ddd', $intValue: 103 });
            console.log('ddd and 103:', result.lastInsertRowId, result.changes);
        } finally {
            await statement.finalizeAsync();
        }
    }
}