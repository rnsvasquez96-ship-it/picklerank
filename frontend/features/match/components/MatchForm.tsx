return (
  <form
    onSubmit={handleSubmit}
    className="mx-auto max-w-4xl space-y-8"
  >
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {matchId ? "Edit Match" : "Create Match"}
        </h2>

        <p className="mt-2 text-gray-500">
          Select the tournament, players and match
          result.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Tournament */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Tournament
          </label>

          <select
            name="tournamentId"
            value={formData.tournamentId}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
          >
            <option value={0}>
              Select Tournament
            </option>

            {tournaments.map((tournament) => (
              <option
                key={tournament.id}
                value={tournament.id}
              >
                {tournament.name}
              </option>
            ))}
          </select>
        </div>

        {/* Player 1 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Player 1
          </label>

          <select
            name="player1Id"
            value={formData.player1Id}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value={0}>
              Select Player
            </option>

            {players.map((player) => (
              <option
                key={player.id}
                value={player.id}
              >
                {player.name}
              </option>
            ))}
          </select>
        </div>

        {/* Player 2 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Player 2
          </label>

          <select
            name="player2Id"
            value={formData.player2Id}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
          >
            <option value={0}>
              Select Player
            </option>

            {players.map((player) => (
              <option
                key={player.id}
                value={player.id}
              >
                {player.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Score Section */}
      <div className="mt-10 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-6">
        <h3 className="mb-6 text-lg font-bold text-gray-900">
          Match Score
        </h3>

        <div className="grid items-center gap-6 md:grid-cols-3">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Player 1 Score
            </label>

            <input
              type="number"
              name="player1Score"
              value={formData.player1Score}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-2xl font-bold outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </div>

          <div className="text-center">
            <div className="text-4xl font-black text-green-600">
              VS
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Player 2 Score
            </label>

            <input
              type="number"
              name="player2Score"
              value={formData.player2Score}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-2xl font-bold outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </div>

        </div>
      </div>

      {/* Status */}
      <div className="mt-8">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Match Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
        >
          <option value="Scheduled">
            Scheduled
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex justify-end gap-4">

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="rounded-xl px-6"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-green-600 px-8 hover:bg-green-700"
        >
          {loading
            ? "Saving..."
            : matchId
            ? "Save Changes"
            : "Create Match"}
        </Button>

      </div>
    </div>
  </form>
);